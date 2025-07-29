<template>
    <div class="hotel-list">
        <h2 class="hotel-list__title" v-if="title">{{ title }}</h2>
        <div class="hotel-list__items">
            <div
                v-for="(item, index) in parsedContent.items"
                :key="index"
                class="hotel-list__item"
            >
                <div
                    class="hotel-card"
                >
                    <img
                        :src="item.image"
                        class="hotel-card__image"
                        alt="Hotel image"
                    >
                    <div
                        class="hotel-card__info"
                    >
                        <div class="hotel-card__content">
                            <h2 class="hotel-card__title">{{ item.title }}</h2>
                            <div class="hotel-card__date-range">
                                {{ item.text }}
                            </div>
                        </div>
                        <button
                            class="hotel-card__button"
                            @click="goToHotel(item)"
                            :style="{
                                backgroundColor: item.colorBackgroundBtn,
                                color: item.colorTextBtn,
                            }"
                        >
                            {{ item.textBtn }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import geoBlock from '../geoBlocks/_geoBlock.vue'
import moment from 'moment'

export default {
    name: 'selectionOfHotelsTours',
    components: {
        geoBlock,
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        content: {},
    },
    data(){
        return {
            // Маппинг ID стран на регионы и слаги стран
            countryMapping: {
                // Европа
                1: { region: 'europe', country: 'turkey' },
                2: { region: 'europe', country: 'greece' },
                3: { region: 'europe', country: 'spain' },
                4: { region: 'europe', country: 'italy' },
                5: { region: 'europe', country: 'france' },
                6: { region: 'europe', country: 'germany' },
                7: { region: 'europe', country: 'portugal' },
                8: { region: 'europe', country: 'croatia' },
                9: { region: 'europe', country: 'montenegro' },
                10: { region: 'europe', country: 'bulgaria' },
                
                // Азия
                20: { region: 'asia', country: 'thailand' },
                21: { region: 'asia', country: 'vietnam' },
                22: { region: 'asia', country: 'china' },
                23: { region: 'asia', country: 'japan' },
                24: { region: 'asia', country: 'south-korea' },
                25: { region: 'asia', country: 'india' },
                26: { region: 'asia', country: 'indonesia' },
                27: { region: 'asia', country: 'malaysia' },
                28: { region: 'asia', country: 'singapore' },
                29: { region: 'asia', country: 'philippines' },
                
                // Африка
                40: { region: 'africa', country: 'egypt' },
                41: { region: 'africa', country: 'tunisia' },
                42: { region: 'africa', country: 'morocco' },
                43: { region: 'africa', country: 'south-africa' },
                44: { region: 'africa', country: 'kenya' },
                45: { region: 'africa', country: 'tanzania' },
                
                // Америка
                60: { region: 'america', country: 'usa' },
                61: { region: 'america', country: 'canada' },
                62: { region: 'america', country: 'mexico' },
                63: { region: 'america', country: 'brazil' },
                64: { region: 'america', country: 'argentina' },
                65: { region: 'america', country: 'chile' },
                66: { region: 'america', country: 'cuba' },
                67: { region: 'america', country: 'dominican-republic' },
                
                // Океания
                80: { region: 'oceania', country: 'australia' },
                81: { region: 'oceania', country: 'new-zealand' },
                82: { region: 'oceania', country: 'fiji' },
            }
        }
    },
    async mounted() {},
    computed: {
        parsedContent() {
            return typeof this.content === 'string'
                ? JSON.parse(this.content)
                : this.content
        },
    },
    methods: {
        getRegionAndCountryByNodeId(nodeId) {
            const mapping = this.countryMapping[nodeId]
            if (mapping) {
                return {
                    regionSlug: mapping.region,
                    countrySlug: mapping.country
                }
            }
            
            // Дефолтные значения, если ID не найден
            return {
                regionSlug: 'europe',
                countrySlug: 'turkey'
            }
        },

        setTourLinkFromItem(item) {
            const basePath = item.departure ? '/searchtour' : '/searchhotel'

            const params = {
                minStartDate: moment(item.dateFrom).format('YYYY-MM-DD'),
                maxStartDate: moment(item.dateTo).format('YYYY-MM-DD'),
                minNightsCount: item.nightsFrom,
                maxNightsCount: item.nightsTo,
                adults: 2,
            }
            if (item.departure?.ebgNodeId) {
                params.departureCityId = item.departure.ebgNodeId
            }
            if (item.arrival?.ebgNodeId) {
                params.arrivalCountryId = item.arrival.ebgNodeId
            }

            if (item.hotels?.length > 0) {
                params.hotelIds = item.hotels.map(hotel => hotel.ebgNodeId).join(',')
            }
            const query = new URLSearchParams(params).toString()

            if (item.departure) {
                // Определяем регион и страну по ebgNodeId
                const { regionSlug, countrySlug } = this.getRegionAndCountryByNodeId(item.arrival?.ebgNodeId)
                return `${window.location.origin}${basePath}/country/${regionSlug}/${countrySlug}?${query}`
            }

            return `${window.location.origin}${basePath}?${query}`
        },

        goToHotel(item) {
            const link = this.setTourLinkFromItem(item)
            if (link) {
                window.open(link, '_blank')
            }
        },
        formatDate(dateString) {
            if(!dateString)
                return ''
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(dateString).toLocaleDateString('ru-RU', options)
        }
    },
}
</script>