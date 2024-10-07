import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import axios from "axios";
import router from '@/router';


export const useUserStore = defineStore('user', () => {
    const token = ref(localStorage.getItem('token') || null);
    const fio = ref();
    const email = ref(localStorage.getItem('email') || null);
    const password = ref();
    const error = ref();
    const products = ref([]);
    // JSON.parse(localStorage.getItem('productsCatalog')) || []
    const productsCatalog = ref(JSON.parse(localStorage.getItem('productsCatalog')));
    const uniqueProducts = computed(() => {
        const productCount = {};

        products.value.forEach(product => {
            if(productCount[product.product_id]){
                productCount[product.product_id].count += 1;
            }else{
                productCount[product.product_id] = {
                    id: product.product_id,
                    product_id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    count: 1,
                };
            }
        })

        return Object.values(productCount);
    });
    const ordersProducts = ref([]);

    const loadCatalog = async () => {
        try{
            const response = await axios.get('http://lifestealer86.ru/api-shop/products');
            productsCatalog.value = response.data.data;
            console.log(productsCatalog.value);
            localStorage.setItem('productsCatalog', JSON.stringify(productsCatalog.value));
        }catch(err){
            console.error('Ошибка при загрузке каталога: ', err);
        }
    }

    const registerUser = async (userData) => {
        error.value = null;
        try{
            const headers = {
                'Content-Type':'application/json',
            };

            const response = await axios.post('http://lifestealer86.ru/api-shop/signup', userData, { headers }); //запрос на регистрацию

            token.value = response.data.data.user_token;
            fio.value = userData.fio;
            email.value = userData.email;
            password.value = userData.password; // вход в систему после регистации

            localStorage.setItem('token', token.value);
            localStorage.setItem('email', email.value);
        }catch(err){
            error.value = err.response || 'Ошибка регистрации';
            console.error('Ошибка при регистрации: ', error.value.status);
            
        }
    }

    const loginUser = async (credentials) => {
        error.value = null;
        try{
            const headers = {
                'Content-Type':'application/json',
            };

            const response = await axios.post('http://lifestealer86.ru/api-shop/login', credentials, { headers });
            token.value = response.data.data.user_token;
            email.value = credentials.email;

            localStorage.setItem('token', token.value);
            localStorage.setItem('email', email.value);

            localStorage.removeItem('ordersWithNames');
        }catch(err){
            error.value = err.response || 'Ошибка авторизации';
            console.log('ошибка при авторизации: ', error.value)
        }
    }

    const logoutUser = async () => {
        const headers = {
            'Authorization': `Bearer ${token.value}`,
        };
        const response = await axios.get('http://lifestealer86.ru/api-shop/logout', { headers });
        console.log(response.data.data.message);
        token.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('productsCatalog');
        localStorage.removeItem('count');
        fio.value = null;
        email.value = null;
        password.value = null;

        products.value = [];

        router.push('/');
    }

    const addToCart = async (product) => {
        if(!token.value){
            if(!error.value){
                error.value = 'Вы должны войти в систему, что бы добавлять товары в корзину!';
            }
            return error;
        }

        try{
            const headers = {
                'Authorization': `Bearer ${token.value}`,
            };

            const response = await axios.post(`http://lifestealer86.ru/api-shop/cart/${product.id}`, { product }, { headers });
            console.log(response);
            showCart();
        }catch(err){
            console.error('Ошибка при добавлении товара: ', err);
        }

    }

    const deleteFromCart = async (product) => {
        const headers = {
            'Authorization': `Bearer ${token.value}`,
        };

        try{
            const response = await axios.delete(`http://lifestealer86.ru/api-shop/cart/${product.product_id}`, { headers });
            products.value = products.value.filter(item => item.id !== product.product_id);
            console.log(response);
        }catch(err){
            console.log('Ошибка при удалении товара из корзины');
        }
    }

    const showCart = async () => {
        if(!token.value){
            alert('Вы не авторизированы, что бы получить корзину!');
        }
        const headers = {
            'Authorization': `Bearer ${token.value}`,
        };

        try{
            const response = await axios.get('http://lifestealer86.ru/api-shop/cart', {headers});
            products.value = response.data.data;
        }catch(err){
            console.error('Ошибка при получении корзины с сервера: ', err);
        }
        
    }

    const getOrder = async () => {
        const headers = {
            'Authorization': `Bearer ${token.value}`,
        };

        const productsOrder = products.value;

        try{
            const response = await axios.post('http://lifestealer86.ru/api-shop/order', { productsOrder }, { headers });
            console.log(response);
            products.value = [];
        }catch(err){
            console.error('Ошибка при оформлении заказа: ', err);
        }
    }

    const watchOrders = async () => {
        const headers = {
            'Authorization': `Bearer ${token.value}`,
        };
        try{
            const response = await axios.get('http://lifestealer86.ru/api-shop/order', { headers });
            ordersProducts.value = response.data.data;
        }catch(err){
            console.error('Ошибка при получении оформленных заказов с сервера: ', error);
        }
    }

    const showNames = (item) => {
        const idWithName = [];
        // здесь мы получаем массив из 
        // айдишников товаров в заказе, осталось
        //  в этот массив запушить объекты из 
        //  айдишника и названия товара, название 
        //  товара нужно получить из массива каталога
        item.products.forEach(id => {
            productsCatalog.value.forEach(product => {
                if(product.id === id){
                    idWithName.push({'id': id, 'name': product.name});
                }
            });
        });
        console.log(idWithName);
        return idWithName;
    }

    const deleteAllItems = (item) => {
        products.value.forEach(product => {
            if(product.product_id === item.id){
                for(let i = 0; i<item.count; i++){
                    deleteFromCart(item);
                }
            }
        })
        // console.log(item);
    }


    watch(token, (newToken) => {
        if(newToken){
            showCart();
        }
    })

    return { token, 
        error, 
        registerUser, 
        loginUser, 
        logoutUser, 
        addToCart, 
        fio, 
        email, 
        password, 
        showCart, 
        products, 
        uniqueProducts, 
        deleteFromCart, 
        getOrder, 
        watchOrders,
        ordersProducts,
        productsCatalog,
        loadCatalog,
        showNames,
        deleteAllItems,
    };
})