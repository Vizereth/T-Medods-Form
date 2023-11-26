<template>
  <p
    :class="[
      'message',
      `message--${type}`,
      `message--${size}`,
      `${isVisible ? 'message--visible' : ''}`,
    ]"
  >
    {{ text }}
  </p>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "success", 
    },
    text: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: true, 
    },
    size: {
      type: String,
      default: "small", 
    },
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

$message-color: #00ffc8;

.message {
  visibility: hidden;

  &--error {
    color: $message-color;
  }

  &--success {
    color: $message-color;
  }

  &--small {
    font-size: 12px;

    @include maxMobileSmall {
      font-size: 11px;
    }
  }

  &--big {
    font-size: 16px;

    @include maxMobileSmall {
      font-size: 12px;
    }
  }

  &--visible {
    visibility: visible;
  }
}
</style>
