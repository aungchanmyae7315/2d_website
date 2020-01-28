<template>
    <main class="sign_up_main">
     
             <q-btn 
               flat
               v-go-back=" '/home' "
              
               icon="arrow_back"
               class="back_icon"
               />

 <q-stepper
      header-nav
      v-model="step"
      ref="stepper"
      alternative-labels
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title=""
        icon="settings"
        :done="step > 1"
      >
        For each ad campaign that you create, you can control how much you're willing to
        spend on clicks and conversions, which networks and geographical locations you want
        your ads to show on, and more.
      </q-step>

      <q-step
        :name="2"
        title=""
        caption="Optional"
        icon="settings"
        :done="step > 2"
      >
        An ad group contains one or more ads which target a shared set of keywords.
      </q-step>

      <q-step
        :name="3"
        title=""
        icon="settings"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Finish' : 'Continue'" ></q-btn>
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" ></q-btn>
        </q-stepper-navigation>
      </template>
    </q-stepper>



    </main>
 </template>

 <style lang="stylus">
    .sign_up_main {
        background-color :#fff;
        color:#000;
    }
  
 </style>

 <script>


export default {
   data () {
    return {
      step: 1
    }
  }
}
</script>