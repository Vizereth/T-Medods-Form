<template>
  <main>
    <div class="messages">
      <p v-if="state.formSubmitted && $v.$invalid" class="error error--big">
        Заполните все обязательные поля
      </p>
      <p
        v-if="state.submitSuccess && state.formSubmitted && !$v.$invalid"
        class="success success-big"
      >
        Форма отправлена успешно!
      </p>
    </div>
    <!-- Форма -->
    <form
      v-if="!state.submitSuccess"
      @submit.prevent="submitForm"
      class="form"
      novalidate
    >
      <!--------------------- Личные данные --------------------->
      <div class="form__section">
        <div class="form__field-wrapper">
          <!-- Фамилия -->
          <div class="form__field">
            <label for="surname" class="form__label">Фамилия*: </label>
            <input v-model="state.surname" name="surname" class="form__input" />
            <p
              v-if="
                state.formSubmitted &&
                !$v.surname.$pending &&
                $v.surname.$invalid
              "
              class="error"
            >
              Заполните поле
            </p>
          </div>

          <!-- Имя -->
          <div class="form__field">
            <label for="name" class="form__label">Имя*: </label>
            <input v-model="state.name" name="name" class="form__input" />
            <p
              v-if="
                state.formSubmitted && !$v.name.$pending && $v.name.$invalid
              "
              class="error"
            >
              Заполните поле
            </p>
          </div>
        </div>

        <div class="form__field-wrapper">
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
              pattern="/+7[0-9]{10}/"
              maxlength="12"
              class="form__input"
            />
            <p
              v-if="
                state.formSubmitted && !$v.phone.$pending && $v.phone.$invalid
              "
              class="error"
            >
              Введите номер телефона
            </p>
          </div>
        </div>

        <div class="form__field-wrapper">
          <!-- Дата рождения -->
          <div class="form__field">
            <label for="birth" class="form__label">Дата рождения*: </label>
            <input
              type="date"
              v-model="state.birth"
              name="birth"
              class="form__input"
            />
            <p
              v-if="
                state.formSubmitted && !$v.birth.$pending && $v.birth.$invalid
              "
              class="error"
            >
              Заполните поле
            </p>
          </div>

          <!-- Врач -->
          <div class="form__field">
            <label for="activeDoctor" class="form__label">Лечащий врач: </label>
            <select
              v-model="state.activeDoctor"
              name="activeDoctor"
              class="form__select"
            >
              <option value="ivanov" class="">Иванов</option>
              <option value="zaharov" class="">Захаров</option>
              <option value="chernisheva" class="">Чернышева</option>
            </select>
          </div>
        </div>

        <div class="form__field-wrapper">
          <!-- Группа клиентов -->
          <div class="form__field">
            <label class="form__label">Группа клиентов*:</label>
            <label class="form__chkbox-label">
              <input
                type="checkbox"
                value="vip"
                v-model="state.clientTypes.vip"
              />
              <span>VIP</span>
            </label>
            <label class="form__chkbox-label">
              <input
                type="checkbox"
                value="problematic"
                v-model="state.clientTypes.problematic"
              />
              <span>Проблемные</span>
            </label>
            <label class="form__chkbox-label">
              <input
                type="checkbox"
                value="oms"
                v-model="state.clientTypes.oms"
              />
              <span>ОМС</span>
            </label>
            <p
              v-if="
                state.formSubmitted &&
                !$v.clientTypes.$pending &&
                $v.clientTypes.$invalid
              "
              class="error"
            >
              Выберите группу
            </p>
          </div>

          <!-- Пол -->
          <div class="form__field">
            <label for="gender" class="form__label">Пол*:</label>
            <div class="form__radio-wrapper">
              <div class="form__radio-field">
                <input
                  type="radio"
                  value="male"
                  v-model="state.gender"
                  name="gender"
                />
                <label for="male">Мужчина</label>
              </div>
              <div class="form__radio-field">
                <input
                  type="radio"
                  value="female"
                  v-model="state.gender"
                  name="gender"
                />
                <label for="female">Женщина</label>
              </div>
            </div>
            <p
              v-if="
                state.formSubmitted && !$v.gender.$pending && $v.gender.$invalid
              "
              class="error"
            >
              Выберите пол
            </p>
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
        <div class="form__field-wrapper">
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

        <div class="form__field-wrapper">
          <!-- Город -->
          <div class="form__field">
            <label for="city" class="form__label">Город*: </label>
            <input
              v-model="state.city"
              name="city"
              id="city"
              class="form__input"
            />
            <p
              v-if="
                state.formSubmitted && !$v.city.$pending && $v.city.$invalid
              "
              class="error"
            >
              Заполните поле
            </p>
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

        <div class="form__field-wrapper">
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
        <div class="form__field-wrapper">
          <!-- Тип документа -->
          <div class="form__field">
            <label for="document" class="form__label">Тип документа*: </label>
            <select
              v-model="state.document"
              name="document"
              id="document"
              class="form__select"
            >
              <option value="passport" class="form__option">Паспорт</option>
              <option value="birth-certificate" class="form__option">
                Свидетельство о рождении
              </option>
              <option value="drivers-licence" class="form__option">
                Вод. удостоверение
              </option>
            </select>
            <p
              v-if="
                state.formSubmitted &&
                !$v.document.$pending &&
                $v.document.$invalid
              "
              class="error"
            >
              Выберите документ
            </p>
          </div>
          <!-- дата выдачи -->
          <div class="form__field">
            <label for="document-date" class="form__label"
              >Дата выдачи*:
            </label>
            <input
              type="date"
              v-model="state.documentDate"
              name="document-date"
              id="document-date"
              class="form__input"
            />
            <p
              v-if="
                state.formSubmitted &&
                !$v.documentDate.$pending &&
                $v.documentDate.$invalid
              "
              class="error"
            >
              Заполните поле
            </p>
          </div>
        </div>

        <div class="form__field-wrapper">
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

      <!-- Отправить -->
      <button type="submit" class="form__submit">Отправить</button>
    </form>
  </main>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const validateTextInput = (value) => {
  return value !== undefined && value !== "";
};

const validatePhone = (value) => {
  const regex = /^\\+7[0-9]{10}$/;
  return regex.test(value);
};

const validateAge = (value) => {
  const currentDate = new Date();
  const birthDate = new Date(value);
  const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return ageDifference - 1 >= 18;
  } else {
    return ageDifference >= 18;
  }
};

const validateClientTypes = (value) => {
  return Object.values(value).some((item) => item === true);
};

export default {
  setup() {
    const state = reactive({
      name: "",
      surname: "",
      lastname: "",
      birth: "",
      gender: "",
      phone: "+7",
      clientTypes: { vip: false, problematic: false, oms: false },
      activeDoctor: "",
      sms: "",
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
    });

    const {
      name,
      surname,
      lastname,
      birth,
      gender,
      phone,
      clientTypes,
      activeDoctor,
      sms,
      zipcode,
      country,
      region,
      city,
      street,
      building,
      document,
      passportSeries,
      passportNumber,
      documentGivenBy,
      documentDate,
      formSubmitted, // eslint-disable-line no-unused-vars
      submitSuccess, // eslint-disable-line no-unused-vars
    } = toRefs(state);

    const rules = {
      name: { required: validateTextInput },
      surname: { required: validateTextInput },
      lastname: "",
      birth: { required: validateAge },
      gender: { required },
      phone: { required: validatePhone },
      clientTypes: { required: validateClientTypes },
      activeDoctor: "",
      sms: "",
      zipcode: "",
      country: "",
      region: "",
      city: { required: validateTextInput },
      street: "",
      building: "",
      document: { required },
      passportSeries: "",
      passportNumber: "",
      documentGivenBy: "",
      documentDate: { required },
    };

    const $v = useVuelidate(rules, {
      name,
      surname,
      lastname,
      birth,
      gender,
      phone,
      clientTypes,
      activeDoctor,
      sms,
      zipcode,
      country,
      region,
      city,
      street,
      building,
      document,
      passportSeries,
      passportNumber,
      documentGivenBy,
      documentDate,
    });

    const submitForm = async () => {
      state.formSubmitted = true;

      if ($v.value.$invalid) {
        return;
      }

      try {
        // Send the validated form to the server to create a document for the client
        state.submitSuccess = true;
      } catch (error) {
        console.error("Form submission error:", error);
      }
    };

    return { state, $v, submitForm };
  },
};
</script>

<style lang="scss">
$primaryColor: rgb(189, 153, 128);
$secondaryColor: rgb(237, 215, 191);
$errorColor: rgb(240, 46, 56);
$sucessColor: #009e60;
$transition: 100ms ease-in;

$device-mobile-small: 480px; // Phone S

@mixin maxMobileSmall {
  @media screen and (max-width: $device-mobile-small) {
    @content;
  }
}

main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 50px 0;
}

.error,
.success {
  font-size: 14px;

  @include maxMobileSmall {
    font-size: 11px;
  }

  &--big {
    font-size: 20px;

    @include maxMobileSmall {
      font-size: 14px;
    }
  }
}

.error {
  color: $errorColor;
}

.success {
  color: $sucessColor;
}

.form {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  &__section {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  &__field-wrapper {
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

  &__radio-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__radio-field {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 15px;

    @include maxMobileSmall {
      font-size: 12px;
    }
  }

  &__label {
    font-size: 16px;

    @include maxMobileSmall{ 
      font-size:13px;
    }
  }

  &__chkbox-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;

    @include maxMobileSmall {
      font-size: 12px;
    }
  }

  &__input {
    width: 100%;
    padding: 7px;
    border: 1px solid $primaryColor;
    font-size: 14px;

    &:focus {
      border: 1px solid rgba($primaryColor, 0.5);
    }

    @include maxMobileSmall{ 
      font-size: 12px;
    }
  }

  &__select {
    border: 1px solid $primaryColor;
    font-size: 14px;
    font-weight: normal;
    padding: 5px;

    &:active, &:focus {
      border: 1px solid $primaryColor;
    }

    @include maxMobileSmall {
      font-size: 12px;
    }

    option {
      font-size: inherit;

      @include maxMobileSmall {
        font-size: 12px;
        padding: 10px;
      }
    }
  }

  &__submit {
    background: rgba($secondaryColor, 0.5);
    border: 1px solid $primaryColor;
    padding: 10px;
    margin-top: 15px;
    transition: $transition;

    &:hover {
      background: rgba($secondaryColor, 0.25);
      border: 1px solid $primaryColor;
    }

    @include maxMobileSmall {
      font-size: 13px;
      margin-top: 5px;
    }
  }
}
</style>
