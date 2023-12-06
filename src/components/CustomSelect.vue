<template>
  <div
    ref="domRef"
    tabindex="0"
    class="custom-select form__input--custom"
    :class="{
      'custom-select--focused': state.isFocused,
    }"
  >
    <div class="custom-select__select" @click.stop="toggleSelect">
      {{ state.selectedOption }}
      <span class="custom-select__arrow">&#x25BE;</span>
    </div>
    <div v-if="state.isOpen" class="custom-select__options">
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
        :class="{
          'custom-select__option--focused': state.focusedOptionIndex === index,
        }"
        class="custom-select__option"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from "@vue/composition-api";

export default {
  props: {
    options: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    const domRef = ref(null);
    const state = reactive({
      options: props.options,
      isOpen: false,
      isFocused: false,
      selectedOption: "",
      focusedOptionIndex: 0,
    });

    const toggleSelect = (event) => {
      event.stopPropagation();
      state.isOpen = !state.isOpen;
      state.focusedOptionIndex = 0;
    };

    const selectOption = (option) => {
      state.selectedOption = option;
      state.isOpen = false;
      emit("update:selectedOption", option);
    };

    const handleKeyPress = (event) => {
      if (!state.isOpen && event.key === "Enter") {
        event.preventDefault();
        state.isOpen = true;
        return;
      }

      if (state.isOpen) {
        switch (event.key) {
          case "Enter":
            event.preventDefault();
            confirmOption();
            break;
          case "ArrowUp":
            event.preventDefault();
            navigateOptions(-1); 
            break;
          case "ArrowDown":
            event.preventDefault();
            navigateOptions(1); 
            break;
          case "Escape":
            closeSelect();
            break;
          default:
            break;
        }
      }
    };

    const navigateOptions = (direction) => {
      const totalOptions = state.options.length;

      if (totalOptions === 0) return;

      state.focusedOptionIndex =
        (state.focusedOptionIndex + direction + totalOptions) % totalOptions;
    };

    const confirmOption = () => {
      const focusedOption = state.options.find(
        (option, index) => index === state.focusedOptionIndex
      );
      if (focusedOption) {
        selectOption(focusedOption);
      }
    };

    const handleClickOutside = (event) => {
      if (
        state.isOpen &&
        !document.querySelector(".custom-select").contains(event.target)
      ) {
        state.isOpen = false;
      }
    };

    const handleFocus = () => {
      state.isFocused = true;
    };

    const handleBlur = () => {
      state.isOpen = false;
      state.isFocused = false;
    };

    const closeSelect = () => {
      state.isOpen = false;
    };

    onMounted(() => {
      domRef.value.addEventListener("blur", handleBlur);
      domRef.value.addEventListener("focus", handleFocus);
      domRef.value.addEventListener("keydown", handleKeyPress);
      domRef.value.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      domRef.value.removeEventListener("blur", handleBlur);
      domRef.value.removeEventListener("focus", handleFocus);
      domRef.value.removeEventListener("keydown", handleKeyPress);
      domRef.value.removeEventListener("click", handleClickOutside);
    });

    return { state, domRef, toggleSelect, selectOption };
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

.custom-select {
  cursor: pointer;
  position: relative;
  width: 100%;

  &--focused {
    .custom-select__select {
      border-bottom: 1px solid $focus-color;
      color: $focus-color;
    }
  }

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

    &:hover {
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
    &--focused {
      color: $focus-color;
    }
  }
}
</style>
