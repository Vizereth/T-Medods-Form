<template>
  <div class="custom-select form__input--custom">
    <div class="custom-select__select" @click.stop="toggleSelect" tabindex="0">
      {{ state.selectedOption }}
      <span class="custom-select__arrow">&#x25BE;</span>
    </div>
    <div v-if="state.isSelectOpen" class="custom-select__options">
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
        class="custom-select__option"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onUnmounted } from "@vue/composition-api";

export default {
  props: {
    options: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    const state = reactive({
      isSelectOpen: false,
      selectedOption: "",
    });

    const toggleSelect = (event) => {
      event.stopPropagation();
      state.isSelectOpen = !state.isSelectOpen;
    };

    const selectOption = (option) => {
      state.selectedOption = option;
      state.isSelectOpen = false;
      emit("update:selectedOption", option);
    };

    const handleClickOutside = (event) => {
      if (
        state.isSelectOpen &&
        !document.querySelector(".custom-select").contains(event.target)
      ) {
        state.isSelectOpen = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return { state, toggleSelect, selectOption };
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

.custom-select {
  cursor: pointer;
  position: relative;
  width: 100%;

  &.disabled {
    pointer-events: none;
  }

  &__select {
    user-select: none;
    position: relative;
    width: 100%;
    height: 25px;
    border-bottom: 1px solid $border-color;
    transition: $transition;

    display: flex;
    align-items: center;
    padding: 5px 2px;

    font-size: 14px;

    &:hover,
    &:focus {
      border-bottom: 1px solid $focus-color;
      color: $focus-color;
    }
  }

  &__arrow {
    position: absolute;
    height: inherit;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 22px;
  }

  &__options {
    @include glassmorphism;
    position: absolute;
    background-color: $bg-color;
    border: 1px solid $focus-color;
    width: inherit;
    left: 0;
    top: 100%;
    z-index: 10;

    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    margin-top: 10px;
  }

  &__option {
    width: inherit;
    font-size: 14px;
    transition: $transition;

    &:hover,
    &:focus {
      color: $focus-color;
    }
  }
}
</style>
