<script setup>
import { ref,reactive, computed, watch } from 'vue'
import Header from '../components/Header.vue'
import { limitValue } from '../utils/limitValue'

const products = reactive([
    { id: 1, name: 'Milk Bikis', price: 15, quantity: 0 },
    { id: 2, name: 'Lays', price: 20, quantity: 0 },
    { id: 3, name: 'Bingo', price: 50, quantity: 0 },
    { id: 4, name: 'Hide & Seek', price: 25, quantity: 0 },
    { id: 5, name: 'Bourbon', price: 30, quantity: 0 },
])
const discountPercent = ref(0)
const taxPercent = ref(0)


const Total = computed(() => {
    return (products.reduce((acc, item) => acc + (item.price * item.quantity), 0)).toFixed(2)
})

const discountAmount = computed(() => {
    return (Total.value * (discountPercent.value / 100))
})

const taxAmount = computed(() => {
    const afterDiscount = Total.value - discountAmount.value
    return (afterDiscount * (taxPercent.value / 100))
})

const grandTotal = computed(() => {
    return Total.value - discountAmount.value + taxAmount.value
})
</script>

<template>
    <Header></Header>
    <v-card class="ma-4 rounded-lg pa-2">
        <v-card-title class="text-center text-h5 pa-3 bg-primary">Shopping Cart</v-card-title>
        <v-table class="rounded elevation-2" hover fixed-header density="comfortable">
            <thead>
                <tr>
                    <th class="text-uppercase text-center font-weight-bold bg-blue-lighten-1 text-white">Id</th>
                    <th class="text-uppercase text-center font-weight-bold bg-blue-lighten-1 text-white">Product Name</th>
                    <th class="text-uppercase text-center font-weight-bold bg-blue-lighten-1 text-white">Price</th>
                    <th class="text-uppercase text-center font-weight-bold bg-blue-lighten-1 text-white">Quantity</th>
                    <th class="text-uppercase text-center font-weight-bold bg-blue-lighten-1 text-white">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td class="text-center">{{ product.id }}</td>
                    <td class="text-center">{{ product.name }}</td>
                    <td class="text-center">₹{{ product.price }}</td>
                    <td class="text-center">
                        <v-text-field
                            v-model.number="product.quantity"
                            type="number"
                            density="compact"
                            hide-details
                            variant="outlined"
                            min="0"
                            class="mx-auto"
                            style="max-width: 100px;"
                            @update:model-value="val => product.quantity = limitValue(val, 0, Infinity)"
                        ></v-text-field>
                    </td>
                    <td class="text-center">₹{{ (product.price * product.quantity).toFixed(2) }}</td>
                </tr>
            </tbody>

            <tfoot class="">
                <tr>
                    <td colspan="4" class="text-right font-weight-bold">Total:</td>
                    <td class="text-center">₹{{ Total }}</td>
                </tr>
                <tr>
                    <td colspan="3" class="text-right font-weight-bold">Discount (%):</td>
                    <td>
                        <v-text-field
                            v-model.number="discountPercent"
                            type="number"
                            density="compact"
                            hide-details
                            variant="underlined"
                            min="0"
                            max="100"
                            @update:model-value="val => discountPercent = limitValue(val, 0, 100)"
                        ></v-text-field>
                    </td>
                    <td class="text-center">- ₹{{ discountAmount.toFixed(2) }}</td>
                </tr>
                <tr>
                    <td colspan="3" class="text-right font-weight-bold">Tax (%):</td>
                    <td>
                        <v-text-field
                            v-model.number="taxPercent"
                            type="number"
                            density="compact"
                            hide-details
                            variant="underlined"
                            min="0"
                            max="100"
                            @update:model-value="val => taxPercent = limitValue(val, 0, 100)"
                        ></v-text-field>
                    </td>
                    <td class="text-center">+ ₹{{ taxAmount.toFixed(2) }}</td>
                </tr>
                <tr class="bg-success-lighten-5">
                    <td colspan="4" class="text-right font-weight-black text-h6">Grand Total:</td>
                    <td class="text-center font-weight-black text-h6">
                        ₹{{ grandTotal.toFixed(2) }}
                    </td>
                </tr>
            </tfoot>
        </v-table>
    </v-card>
</template>