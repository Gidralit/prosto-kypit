<script setup>
  import router from '@/router';
import { useUserStore } from '@/stores/useCounterStores';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
  import * as yup from 'yup'

  const userStore = useUserStore();

  /**
   *  yup.object() - создание схемы валидации, которое мы можем передать в useForm
   *
   * .string() - Введенное значение должно быть строкой
   * .email(message) - Проверяет корректность ввода почты
   * .required(message) - Поле является обязательным
   * .min(minValue, message)/.max(maxValue, message) - указание минимального/максимального количества символов
   *
   * message - Объявление текста ошибки
   * */

  const yupValidationSchema = yup.object({
    email: yup
      .string()
      .email('Некорректная почта')
      .required('Поле является обязательным'),
    password: yup.string().min(6).max(20).required('Пожалуйста введите пароль')
  })
  const {
    defineField,
    errors,
    handleSubmit
  } = useForm({
    validationSchema: yupValidationSchema
  })

  /** объявление полей для хранения значений */
  const [email, emailAttrs] = defineField('email')
  const [password, passwordAttrs] = defineField('password')

  const loginError = ref(false);
  /** handleSubmit(values => {}) считывает значения со всех объявленных полей, и вызывает callback с объектом данных этих полей */
  const submit = handleSubmit(async (values) => {
    await userStore.loginUser(values);
    if(userStore.error && userStore.error.status === 401){
      loginError.value = true;
    }else{
      loginError.value = false;
      console.log(userStore.token);
      router.push('/');
    } /** Выведет { email: 'введенный_email', password: 'введенный_пароль' } */
  })
</script>

<template>
    <div class="registerForm">
        <div class="registerForm-container">
            <p>Вход в аккаунт</p>
            <form @submit.prevent="submit">

                <label for="email">Email</label>
                <!--  v-model="email" - считывает значение с input и передаёт его в email  -->
                <input 
                :class="{'error_input' : errors.email || loginError}"
                type="email" 
                id="email" 
                v-model="email"
                v-bind="emailAttrs" 
                placeholder="IvanIvanow@email.com">
                <transition name="fade"><p v-if="errors.email">{{ errors.email }}</p></transition>
                <transition name="fade"><p v-if="loginError">Вы ввели неправильные данные, повторите попытку или <router-link to="/register"><strong>зарегистрируйтесь</strong></router-link></p></transition>

                <label for="password">Пароль</label>
                <input 
                :class="{'error_input' : errors.password || loginError}"
                type="password" 
                id="password" 
                v-model="password" 
                v-bind="passwordAttrs" 
                placeholder="**********">
                <transition name="fade"><p v-if="errors.password">{{ errors.password }}</p></transition>

                <router-link to="/">Вернуться назад</router-link>
                <!-- Не даём отправить форму если в почте или пароле есть ошибки валидации   -->
                <button :disabled="errors.email || errors.password">Войти в аккаунт</button>
                <span><p>Нет аккаунта?</p>&nbsp;<router-link to="register">Регистрация</router-link></span>
            </form>
            </div>
        </div>
</template>

<style>
    @import url(/src/style/register/register.scss);
</style>
