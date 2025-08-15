<template>
  <article class="transfer-card">
    <div class="transfer-content">
      <!-- Transfer Details -->
      <header class="transfer-header">
        <h2 
          :class="{ 'v-loading': loading.tour }" 
          class="transfer-title"
        >
          <span :class="{ 'v-loading': loading.price }">Business</span>
        </h2>
      </header>
      
      <p class="transfer-description">
        Mercedes E-class, Lexus GS, Audi A6, BMW 5 Series и т.п.
      </p>
      
      <div class="transfer-promo">
        <span class="transfer-promo-text">
          Бесплатная отмена заказа
          <span class="v-icon-info-circle" aria-label="Информация"></span>
        </span>
      </div>
      
      <ul class="transfer-features">
        <li class="transfer-feature">
          Встреча с табличкой・90 минут ожидания
          <span class="v-icon-info-circle" aria-label="Информация"></span>
        </li>
        <li class="transfer-feature">
          <span class="booking-icon-arrow-scale" aria-hidden="true"></span>
          4 пассажира
        </li>
        <li class="transfer-feature">
          <span class="booking-icon-bed" aria-hidden="true"></span>
          3 места багажа
          <span class="v-icon-info-circle" aria-label="Информация"></span>
        </li>
      </ul>
    </div>
    
    <div class="transfer-image-container">
      <div 
        class="transfer-image"
        :class="{ 'v-loading': loading.tour, 'no-image': !tour.imgUrl }"
      >
        <img
          v-if="tour.imgUrl"
          :src="tour.imgUrl"
          :alt="$i18n('bookingFly.imageOfTour')"
          class="transfer-image-object"
          @error="handleImageError"
        />
        <img
          v-else
          :src="defaultImageUrl"
          :alt="$i18n('bookingFly.imageOfTour')"
          class="transfer-image-object"
        />
      </div>
    </div>
  </article>
</template>

<script>
import variables from '../../../plugins/variables'

export default {
  name: 'BookingTransfer',
  
  props: {
    tour: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Object,
      default: () => ({
        tour: false,
        price: false,
      }),
      validator(value) {
        return typeof value.tour === 'boolean' && typeof value.price === 'boolean'
      },
    },
  },
  
  computed: {
    defaultImageUrl() {
      return `${variables.imgPath}/booking/excursion-default.jpg`
    },
  },
  
  methods: {
    handleImageError(event) {
      event.target.src = this.defaultImageUrl
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../../../../sass/colors';

// Base styles
.transfer-card {
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
  padding: 24px;
  border: 1px solid $v-border-separator;
  border-radius: 16px;
}

.transfer-content {
  flex: 1;
  max-width: 546px;
}

.transfer-image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

// Header styles
.transfer-header {
  margin-bottom: 4px;
}

.transfer-title {
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  color: #2e2e32;
}

// Content styles
.transfer-description {
  margin: 0 0 24px 0;
  max-width: 390px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #7e8389;
}

.transfer-promo {
  margin-bottom: 24px;
  padding: 4px 8px;
  background: #edfaf9;
  border-radius: 8px;
  width: fit-content;
  min-width: 140px;
  height: 30px;
  cursor: pointer;
}

.transfer-promo-text {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
}

// Features list
.transfer-features {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
}

.transfer-feature {
  display: flex;
  align-items: center;
  gap: 7px;
}

// Image styles
.transfer-image {
  width: 224px;
  height: 218px;
  border-radius: 16px;
  overflow: hidden;
  
  &.no-image {
    width: 265px;
    height: 260px;
  }
}

.transfer-image-object {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

// Icon styles
.v-icon-info-circle {
  background: $v-icon-secondary-1;
  width: 20px;
  height: 20px;
  mask-size: contain;
  -webkit-mask-size: contain;
}

// Loading state
.v-loading {
  opacity: 0.6;
  pointer-events: none;
}

// Mobile responsive styles
@media (max-width: 768px) {
  .transfer-card {
    flex-direction: column;
    margin-bottom: 32px;
    padding: 20px 16px;
  }
  
  .transfer-content {
    max-width: 100%;
  }
  
  .transfer-image-container {
    order: -1;
    margin-bottom: 20px;
  }
  
  .transfer-image {
    width: 100%;
    height: 270px;
    
    &.no-image {
      width: 100%;
      height: 270px;
    }
  }
  
  .transfer-description {
    max-width: 100%;
  }
  
  .transfer-features {
    flex-direction: column;
    gap: 12px;
  }
}
</style>