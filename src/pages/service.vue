<template>
    <main>
        <div class="service">
            <img src="statics/icons_service/Customer_services_icon.png" alt="">
            <p class="contact_text">Contact us via Viber or Phone call</p>
            <ul class="service_contact">
                <li>  <q-btn color="white" text-color="black" icon="phone"  label=" 09 798 455 846 " ></q-btn></li>
                <li>   <q-btn color="white" text-color="black" icon="phone"  label="09 798 455 846" ></q-btn></li>
                <li>   <q-btn color="white" text-color="black" icon="phone"  label="09 798 455 846" ></q-btn></li>
                <li>   <q-btn color="white" text-color="black" icon="phone"  label="09 798 455 846" ></q-btn></li>
                <li>  <q-btn color="white" text-color="black" icon="phone"  label="09 798 455 846" ></q-btn></li>
               
                 

            </ul>
           <h6>Or</h6>
           <p class="contact_chat"> You can just message to us </p>
            <q-btn align="around" class="btn-fixed-width" color="green" label="Chat with our customer service" ></q-btn>
        </div>
    </main>
 </template>

 <style lang="stylus">
    .service {
        text-align:center;
    }
    .service .contact_text {
        color:#BDC5BE;
        margin-bottom:50px;
    }
    .service .contact_chat {
        color:#BDC5BE;
    }
    h6        {
    color:#BDC5BE;
    font-family:'Oswald';
    font-weight:700;
    position:relative;  
    margin: 80px auto 20px auto;
    font-size: 16px;
    line-height: 15px;
    width: 282px;
}

h6:before, h6:after {
  background:#BDC5BE;
  content:"";
  display:block;
  height:1px;
  position:absolute;
  width:125px;
}

h6:before  {  
  left:0;
  top:9px;
  border-radius: 90px 0 0 90px;
  -moz-border-radius: 90px 0 0 90px;
  -webkit-border-radius: 90px 0 0 90px;
}

h6:after   {
  right:0;
  top:9px;
  border-radius: 0 90px 90px 0;
  -moz-border-radius: 0 90px 90px 0;
  -webkit-border-radius:  0 90px 90px 0;
}
    .service_contact {
        margin:0;
        padding:0;
    }
    .service_contact li {
        
        list-style:none;
       
        margin:10px auto;
       max-width 414px;
       width:100%;
       padding:8px 15px;
    }
    .service_contact .q-btn--rectangle  {
       border-radius:12px;
    }
    .service_contact li:hover a {
      color:#2D5936;
      transition-delay:.2s;
    }
    .service_contact li a {
        text-decoration:none;
        color:#35343A;
        font-size:16px;
        
    }
  
 </style>