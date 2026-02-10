<script setup>
const show = defineModel('show', { type: Boolean, default: false })
const item = defineModel('item', { type: Object, default: null })

const props = defineProps({
    title: { type: String, default: 'Confirm Action' },
    confirmText: { type: String, default: 'Confirm' },
    confirmColor: { type: String, default: 'primary' }
})

const emit = defineEmits(['confirm'])

const handleConfirm = () => {
    if (item.value) {
        emit('confirm', item.value)
        show.value = false
    }
}
</script>

<template>
    <v-dialog v-model="show" max-width="400">
        <v-card v-if="item">
            <v-card-title class="text-h5 pa-4">
                {{ title }}
            </v-card-title>

            <v-card-text class="pa-4">
                <slot :item="item"></slot>
            </v-card-text>

            <v-card-actions class="pa-4">
                <v-btn 
                    variant="text" 
                    color="grey-darken-1" 
                    @click="show = false"
                >
                    Cancel
                </v-btn>
                <v-btn 
                    :color="confirmColor" 
                    variant="elevated" 
                    @click="handleConfirm"
                >
                    {{ confirmText }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>