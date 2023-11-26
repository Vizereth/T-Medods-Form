<template>
  <main>
    <!-- Форма -->
    <form class="form" novalidate>
      <!--------------------- Личные данные --------------------->
      <div class="form__section">
        <div class="form__group">
          <!-- Фамилия -->
          <div class="form__field">
            <label for="surname" class="form__label">Фамилия*: </label>
            <input v-model="state.surname" name="surname" class="form__input" />
            <VueMessage
              type="error"
              :isVisible="
                state.formSubmitted &&
                !$v.surname.$pending &&
                $v.surname.$invalid
              "
              size="small"
              text="Это поле обязательно для заполнения"
            />
          </div>

          <!-- Имя -->
          <div class="form__field">
            <label for="name" class="form__label">Имя*: </label>
            <input v-model="state.name" name="name" class="form__input" />
            <VueMessage
              type="error"
              :isVisible="
                state.formSubmitted && !$v.name.$pending && $v.name.$invalid
              "
              size="small"
              text="Это поле обязательно для заполнения"
            />
          </div>
        </div>

        <div class="form__group">
          <!-- Отчество -->
          <div class="form__field">
            <label for="lastname" class="form__label">Отчество: </label>
            <input
              v-model="state.lastname"
              name="lastname"
              class="form__input"
            />
          </div>
          <!-- Телефон-->
          <div class="form__field">
            <label for="phone" class="form__label">Номер телефона*:</label>
            <input
              type="tel"
              id="phone"
              v-model="state.phone"
              pattern="/^\+7\d{10}$/"
              maxlength="12"
              class="form__input"
            />
            <VueMessage
              type="error"
              :isVisible="
                state.formSubmitted && !$v.phone.$pending && $v.phone.$invalid
              "
              size="small"
              text="Это поле обязательно для заполнения"
            />
          </div>
        </div>

        <div class="form__group">
          <!-- Дата рождения -->
          <div class="form__field">
            <label for="birth" class="form__label">Дата рождения*: </label>
            <div class="form__input-container">
              <input
                type="date"
                v-model="state.birth"
                name="birth"
                class="form__input"
              />
            </div>
            <VueMessage
              type="error"
              :isVisible="
                state.formSubmitted && !$v.birth.$pending && $v.birth.$invalid
              "
              size="small"
              text="Выберите дату рождения"
            />
          </div>
        </div>

        <!-- Врач -->
        <div class="form__field">
          <label for="activeDoctor" class="form__label">Лечащий врач: </label>
          <CustomSelect
            :options="['Иванов', 'Захаров', 'Чернышева']"
            @update:selectedOption="handleSelectedDoctor"
          />
        </div>

        <div class="form__group">
          <!-- Группа клиентов -->
          <div class="form__field">
            <label class="form__label">Группа клиентов*:</label>
            <div class="form__options-container">
              <label class="form__chkbox-label">
                <input
                  type="checkbox"
                  value="vip"
                  v-model="state.clientTypes.vip"
                  class="form__input"
                />
                <span>VIP</span>
              </label>
              <label class="form__chkbox-label">
                <input
                  type="checkbox"
                  value="problematic"
                  v-model="state.clientTypes.problematic"
                  class="form__input"
                />
                <span>Проблемные</span>
              </label>
              <label class="form__chkbox-label">
                <input
                  type="checkbox"
                  value="oms"
                  v-model="state.clientTypes.oms"
                  class="form__input"
                />
                <span>ОМС</span>
              </label>
            </div>
            <VueMessage
              type="error"
              :isVisible="
                state.formSubmitted &&
                !$v.clientTypes.$pending &&
                $v.clientTypes.$invalid
              "
              size="small"
              text="Выберите хотя бы одну группу"
            />
          </div>

          <!-- Пол -->
          <div class="form__field">
            <label for="gender" class="form__label">Пол:</label>
            <div class="form__options-container">
              <div class="form__radio-field">
                <input
                  type="radio"
                  value="male"
                  v-model="state.gender"
                  name="gender"
                  class="form__input"
                />
                <label for="male">Мужчина</label>
              </div>
              <div class="form__radio-field">
                <input
                  type="radio"
                  value="female"
                  v-model="state.gender"
                  name="gender"
                  class="form__input"
                />
                <label for="female">Женщина</label>
              </div>
            </div>
          </div>
        </div>

        <!-- СМС -->
        <div class="form__field">
          <label class="form__chkbox-label">
            <input type="checkbox" value="no-sms" v-model="state.sms" />
            <span>Не отправлять смс</span>
          </label>
        </div>
      </div>

      <!--------------------- Адрес --------------------->
      <div class="form__section">
        <div class="form__group">
          <!-- Страна -->
          <div class="form__field">
            <label for="country" class="form__label">Страна: </label>
            <input
              v-model="state.country"
              name="surname"
              id="country"
              class="form__input"
            />
          </div>

          <!-- Область -->
          <div class="form__field">
            <label for="region" class="form__label">Область: </label>
            <input
              v-model="state.region"
              name="region"
              id="region"
              class="form__input"
            />
          </div>
        </div>

        <div class="form__group">
          <!-- Город -->
          <div class="form__field">
            <label for="city" class="form__label">Город*: </label>
            <input
              v-model="state.city"
              name="city"
              id="city"
              class="form__input"
            />
            <VueMessage
              type="error"
              :isVisible="
                state.formSubmitted && !$v.city.$pending && $v.city.$invalid
              "
              size="small"
              text="Это поле обязательно для заполнения"
            />
          </div>

          <!-- Улица -->
          <div class="form__field">
            <label for="street" class="form__label">Улица: </label>
            <input
              v-model="state.street"
              name="street"
              id="street"
              class="form__input"
            />
          </div>
        </div>

        <div class="form__group">
          <!-- Дом -->
          <div class="form__field">
            <label for="building" class="form__label">Дом: </label>
            <input
              v-model="state.building"
              name="building"
              id="building"
              class="form__input"
            />
          </div>
          <!-- Индекс -->
          <div class="form__field">
            <label for="zipcode" class="form__label">Индекс: </label>
            <input
              v-model="state.zipcode"
              name="zipcode"
              id="zipcode"
              class="form__input"
            />
          </div>
        </div>
      </div>

      <!--------------------- Паспорт --------------------->
      <div class="form__section">
        <!-- Тип документа -->
        <div class="form__field">
          <label for="document" class="form__label">Тип документа*: </label>
          <CustomSelect
            :options="[
              'Паспорт',
              'Свидетельство о рождении',
              'Вод. удостоверение',
            ]"
            @update:selectedOption="handleSelectedDocument"
          />
          <VueMessage
            type="error"
            :isVisible="
              state.formSubmitted &&
              !$v.document.$pending &&
              $v.document.$invalid
            "
            size="small"
            text="Выберите тип документа"
          />
        </div>

        <!-- дата выдачи -->
        <div class="form__field">
          <label for="document-date" class="form__label">Дата выдачи*: </label>
          <input
            type="date"
            v-model="state.documentDate"
            name="document-date"
            id="document-date"
            class="form__input"
          />
          <VueMessage
            type="error"
            :isVisible="
              state.formSubmitted &&
              !$v.documentDate.$pending &&
              $v.documentDate.$invalid
            "
            size="small"
            text="Выберите дату выдачи"
          />
        </div>

        <div class="form__group">
          <!-- Серия -->
          <div class="form__field">
            <label for="passport-series" class="form__label">Серия: </label>
            <input
              v-model="state.passportSeries"
              name="passport-series"
              id="passport-series"
              class="form__input"
            />
          </div>

          <!-- Номер -->
          <div class="form__field">
            <label for="passport-number" class="form__label">Номер: </label>
            <input
              v-model="state.passportNumber"
              name="passport-number"
              id="passport-number"
              class="form__input"
            />
          </div>
        </div>

        <!-- Кем выдан -->
        <div class="form__field">
          <label for="document-given-by" class="form__label">Кем выдан: </label>
          <input
            v-model="state.documentGivenBy"
            name="document-given-by"
            id="document-given-by"
            class="form__input"
          />
        </div>
      </div>

      <!-- Кнопки -->
      <button
        v-if="!state.submitSuccess && $v.$invalid"
        type="submit"
        class="form__btn form__btn--submit"
        @click="submitForm()"
      >
        Создать клиента
      </button>
      <button
        v-if="state.formSubmitted && state.submitSuccess && !$v.$invalid"
        type="button"
        class="form__btn form__btn--new"
        @click.prevent="newForm()"
      >
        Новый клиент
      </button>

      <div class="form__section">
        <div class="messages">
          <div
            v-if="!state.submitSuccess && state.formSubmitted && $v.$invalid"
          >
            <VueMessage
              type="error"
              :isVisible="true"
              size="big"
              text="Заполните все обязательные поля"
            />
          </div>
          <div
            v-if="state.submitSuccess && state.formSubmitted && !$v.$invalid"
          >
            <VueMessage
              type="success"
              :isVisible="true"
              size="big"
              text="Клиент успешно создан!"
            />
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import {
  validateTextInput,
  validatePhoneNumber,
  validateClientTypes,
} from "../utils/validators";
import { enableForm, disableForm } from "../utils/helpers";

import VueMessage from "./VueMessage.vue";
import CustomSelect from "./CustomSelect.vue";

export default {
  components: { VueMessage, CustomSelect },
  setup() {
    const initialState = {
      name: "",
      surname: "",
      lastname: "",
      birth: "",
      gender: "",
      phone: "+7",
      clientTypes: { vip: false, problematic: false, oms: false },
      activeDoctor: "",
      sms: false,
      zipcode: "",
      country: "",
      region: "",
      city: "",
      street: "",
      building: "",
      document: "",
      passportSeries: "",
      passportNumber: "",
      documentGivenBy: "",
      documentDate: "",
      formSubmitted: false,
      submitSuccess: false,
    };

    const state = reactive(initialState);

    const ruleKeys = [
      "name",
      "surname",
      "lastname",
      "birth",
      "gender",
      "phone",
      "clientTypes",
      "activeDoctor",
      "sms",
      "zipcode",
      "country",
      "region",
      "city",
      "street",
      "building",
      "document",
      "passportSeries",
      "passportNumber",
      "documentGivenBy",
      "documentDate",
    ];

    const createRules = () => {
      const newRules = ruleKeys.reduce((acc, key) => {
        acc[key] = required;
        return acc;
      }, {});

      newRules.name = { required: validateTextInput };
      newRules.surname = { required: validateTextInput };
      newRules.birth = { required };
      newRules.phone = { required: validatePhoneNumber };
      newRules.clientTypes = { required: validateClientTypes };
      newRules.city = { required: validateTextInput };
      newRules.document = { required };
      newRules.documentDate = { required };

      return newRules;
    };

    const rules = createRules();

    const $v = useVuelidate(rules, state);

    const handleSelectedDoctor = (option) => {
      state.activeDoctor = option;
    };

    const handleSelectedDocument = (option) => {
      state.document = option;
    };

    const newForm = () => {
      // Reset each field manually because loop does not work
      state.name = "";
      state.surname = "";
      state.lastname = "";
      state.birth = "";
      state.gender = "";
      state.phone = "+7";
      state.clientTypes = { vip: false, problematic: false, oms: false };
      state.activeDoctor = "";
      state.sms = false;
      state.zipcode = "";
      state.country = "";
      state.region = "";
      state.city = "";
      state.street = "";
      state.building = "";
      state.document = "";
      state.passportSeries = "";
      state.passportNumber = "";
      state.documentGivenBy = "";
      state.documentDate = "";
      state.formSubmitted = false;
      state.submitSuccess = false;

      enableForm();
    };

    const submitForm = async () => {
      state.formSubmitted = true;

      if ($v.value.$invalid) {
        state.submitSuccess = false;
        return;
      }

      try {
        // Send the validated form to the server to create a document for the client
        state.submitSuccess = true;
        disableForm();
      } catch (error) {
        console.error("Form submission error:", error);
      }
    };

    return {
      state,
      $v,
      submitForm,
      newForm,
      handleSelectedDoctor,
      handleSelectedDocument,
    };
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 50px 0;

  @include maxMobileSmall {
    padding: 25px 5px;
  }
}

input,
textarea,
select {
  background-color: transparent;
  border-bottom: 1px solid $border-color;
  color: $text-color;
  padding: 5px 2px;
  transition: $transition;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    border-bottom: 1px solid $focus-color;
  }
}

input[type="date"],
input[type="checkbox"],
input[type="radio"] {
  user-select: none;
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  appearance: none;
  border: 2px solid $border-color;
  border-radius: 2px;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    border: 2px solid $focus-color;
  }

  &:checked {
    border: 2px solid $focus-color;
  }

  &:checked:before {
    content: "\2713";
    color: $focus-color;
    font-size: 12px;
  }
}

input[type="radio"] {
  appearance: none;
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid $border-color;
  border-radius: 50%;
  position: relative;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    border: 2px solid $focus-color;
  }

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $focus-color;
    display: none;
  }

  &:checked {
    border: 2px solid $focus-color;
  }

  &:checked:before {
    display: flex;
  }
}

.messages {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.form {
  @include glassmorphism;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 50px;

  @include maxMobileSmall {
    gap: 25px;
    padding: 20px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 25px;

    @include maxMobileSmall {
      gap: 20px;
    }
  }

  &__group {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;

    @include maxMobileSmall {
      flex-direction: column;
    }
  }

  &__field {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__input-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__input {
    width: 100%;
    font-size: 14px;

    &:disabled {
      cursor: not-allowed;
    }

    @include maxMobileSmall {
      font-size: 12px;
    }
  }

  &__options-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 5px;
  }

  &__radio-field {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;

    @include maxMobileSmall {
      font-size: 12px;
    }
  }

  &__label {
    font-size: 16px;

    @include maxMobileSmall {
      font-size: 13px;
    }
  }

  &__chkbox-label {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;

    @include maxMobileSmall {
      font-size: 12px;
    }
  }

  &__btn {
    @include glassmorphism;
    padding: 12px 16px;
    margin-top: 15px;
    transition: $transition;

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 0%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 100%
      );
      border: 1px solid rgba($focus-color,0.5);
      color: $focus-color;
    }

    @include maxMobileSmall {
      font-size: 13px;
      margin-top: 5px;
    }
  }
}
</style>
