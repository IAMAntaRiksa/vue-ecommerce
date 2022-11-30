
<template>
    <div>
        <div class="container-fluid mt-3">
            <div class="row">
                <div class="col-md-3 mb-4">
                    <Category /> <!-- component Category -->
                </div>
                <div class="col-md-9 mb-4">
                    <Slider /> <!-- component Slider -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Category from '../../components/Category.vue';
import Slider from '../../components/Slider.vue';
</script>


