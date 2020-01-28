<template>
    <main>
      <div class="main_bet">
          <q-toolbar>
             <q-btn 
               flat
               v-go-back=" '/home' "
              
               icon="arrow_back"
               class="back_icon"
               />
           
             
          
            <div class="bet">
               <q-input outlined bottom-slots v-model="text"  placeholder="(min)500 Ks" >
                     <template v-slot:prepend>
                        <q-icon color="black">Ks</q-icon>
                     </template>
                     <template v-slot:append>
                        <q-icon name="close" @click="text = ''" class="cursor-pointer" ></q-icon>
                     </template>
                  </q-input>
                  
            </div>
            <div class="row">
               <div class="col">
                    <q-btn class="fast_btn" text-color="black" style="border-radius:10px"  label="Fast" ></q-btn>
               </div>
               <div class="col" style="text-align:center">
                   <q-btn flat style="color: #D4E2FF" @click="bet_close" label="Best Close" ></q-btn>
               </div>
               <div class="col" style="text-align:center">
                <div style="color:#fff;padding-top:5px; font-size:17px;"> <Time></Time></div>
               </div>
            </div>
          </q-toolbar>
         <div class="all_btn">
              <!-- <q-btn color="primary" label="Primary" ></q-btn> -->
 

               <!-- <q-btn class="btn number-btns" label="01"></q-btn>
               <q-btn class="btn number-btns" label="02"></q-btn>
               <q-btn class="btn number-btns" label="03"></q-btn>
               <q-btn class="btn number-btns" label="04"></q-btn>
               <q-btn class="btn number-btns" label="05"></q-btn>
               <q-btn class="btn number-btns" label="06"></q-btn>
               <q-btn class="btn number-btns" label="07"></q-btn>
               <q-btn class="btn number-btns" label="08"></q-btn>
               <q-btn class="btn number-btns" label="09"></q-btn>
               <q-btn class="btn number-btns" color="primary" label="10"></q-btn>
               <q-btn class="btn number-btns" label="11"></q-btn>
               <q-btn class="btn number-btns" label="12"></q-btn>
               <q-btn class="btn number-btns" label="13"></q-btn>
               <q-btn class="btn number-btns" label="14"></q-btn>
               <q-btn class="btn number-btns" label="15"></q-btn>
               <q-btn class="btn number-btns" label="16"></q-btn>
               <button class="btn hello-btns">02</button>
               <button class="btn hello-btns">03</button> -->

           
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">00</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">01</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">02</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">03</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">04</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">05</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">06</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">07</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">08</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">09</button>

               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">10</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">11</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">12</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">13</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">14</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">15</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">16</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">17</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">18</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">19</button>
  
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">21</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">21</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">23</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">24</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">25</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">26</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">27</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">28</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">29</button>
               <button style="background:#14612D" class="btn btn_sm" :class="{ active: isActive }" @click="add_btn_select">30</button>

               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">31</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">32</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">33</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">34</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">35</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">36</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">37</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">38</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">39</button>
               <button style="background:rgb(195, 171, 75)" class="btn btn_md" :class="{ active: isActive }" @click="add_btn_select">40</button>

         </div>


      </div>
   </main>
 </template>

 <style >
.btn {
   border: 0;
   margin: 11px;
   border-radius: 10px;
   padding: 14px 16px;
   color: #e0dddd;
   font-weight: bold;
}
.active {
   border: 0;
   margin: 11px;
   border-radius: 10px;
   padding: 14px 16px;
   background:red !important;
   color:#fff;
   font-weight: bold;
}
.active:focus {
   border-color:#000;
}
.isActive {
   border: 0;
   margin: 11px;
   border-radius: 10px;
   padding: 14px 16px;
   color:#e0dddd;
   font-weight: bold;
   
}

   .back_icon {
      color:#fff;
      margin-top:10px;
      margin-left:-18px;
      font-size: 20px;
   }
      .main_bet .q-toolbar {
         display: block;
      }
    .bet {
     text-align: center;
     margin:0 auto;
     display: block;
    
    }
    .bet .q-field--outlined .q-field__control {
       background-color: #fff;
       color:#fff;
       margin-top:5px;
    }
    .bet .q-field__native {
       text-align: right;
       
    }
    .bet .q-field--outlined .q-field__control {
       border-radius: 10px;
    }
    .fast_btn {
       background-color:#D4E2FF;
       width:100%;
       
    }
    .all_btn {
       text-align: center;
       margin:20px auto;
    }
    .all_btn .q-btn {   
       margin:15px;
    }
   .q-layout {
      background-position: unset !important;
   }
 </style>

<script>
import Time from '../components/Time.vue'

export default {
  components: {
   Time
    
  },
   data () {
    return {
       isActive: false
    }
   },
  methods: {
      add_btn_select(event) {
         if(event.target.className == "active") 
         {
            event.target.className = "isActive";
         }else {
             event.target.className = "active";
         }
      },
      // bet_close(event) {
      //    alert('ok')
      //      target.className = "isActive"
                
      // }
      bet_close(event){
            event.active = true
        }
    
  },
}
</script>

 beforeDestroy () {
    clearInterval(this.interval)
  }