<script setup>
  import { useForm } from 'vee-validate';
  import * as yup from 'yup';
  import { useUserStore } from '@/stores/useCounterStores';
import { ref } from 'vue';
import router from '@/router';
  // import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  // const router = useRouter();

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
    fio: yup.string().required('Пожалуйста введите ФИО'),
    email: yup
      .string()
      .email('Некорректная почта')
      .required('Пожалуйста введите почту'),
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
  const [email, emailAttrs] = defineField('email');
  const [password, passwordAttrs] = defineField('password');
  const [fio, fioAttrs] = defineField('fio');

  const registrationError = ref(false);
  /** handleSubmit(values => {}) считывает значения со всех объявленных полей, и вызывает callback с объектом данных этих полей */
  const submit = handleSubmit(async (values) => {
      await userStore.registerUser(values);

      if(userStore.error && userStore.error.status == 422){
        registrationError.value = true;
      }else{
        registrationError.value = false;
        router.push('/');
      }
    // console.log(values) /** Выведет { email: 'введенный_email', password: 'введенный_пароль' } */
  })
</script>

<template>
    <div class="registerForm">
        <div class="registerForm-container">
            <p>Регистрация</p>
            <form @submit.prevent="submit">

                <label for="fio">Ваше ФИО</label>
                <input 
                :class="{'error_input' : errors.fio}"
                type="text" 
                id="fio" 
                v-model="fio" 
                v-bind="fioAttrs" 
                placeholder="Иванов Иван Иванович" />
                <transition name="fade"><p v-if="errors.fio">{{ errors.fio }}</p></transition>


                <label for="email">Email</label>
                <!--  v-model="email" - считывает значение с input и передаёт его в email  -->
                <input 
                :class="{'error_input' : errors.email || registrationError}"
                type="email" 
                id="email" 
                v-model="email" 
                v-bind="emailAttrs" 
                placeholder="IvanIvanow@email.com">
                <transition name="fade"><p v-if="errors.email">{{ errors.email }}</p></transition>
                <transition name="fade"><p v-if="registrationError">Данная почта уже занята.</p></transition>

                <label for="password">Пароль</label>
                <input 
                :class="{'error_input' : errors.password}"
                type="password" 
                id="password" 
                v-model="password" 
                v-bind="passwordAttrs" 
                placeholder="**********">
                <transition name="fade"><p v-if="errors.password">{{ errors.password }}</p></transition>

                <router-link to="/">Вернуться назад</router-link>
                <!-- Не даём отправить форму если в почте или пароле есть ошибки валидации   -->
                <button :disabled="errors.login || errors.email || errors.password">Зарегистрироваться</button>
                <span><p>Есть аккаунт?</p>&nbsp;<router-link to="login">Войти</router-link></span>
            </form>
            </div>
        </div>
</template>

<style>
@import url(../style/register/register.scss);
</style>
