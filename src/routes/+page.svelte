<script>
  import Header from "./Header.svelte";
  import List from "./List.svelte";
  import Total from "./Total.svelte";
  import Dialog from "./Dialog.svelte";
  import Toggle from "./Toggle.svelte";
  
  import { fade } from 'svelte/transition';
  
  let dialogVis = false;
  
  function handleHeaderClick() {
      dialogVis = !dialogVis;
      console.log('Dialog visibility:', dialogVis);
  }
  
  function handleDialogClose() {
      dialogVis = false;
  }
  </script>
  
  <section>888
  <Header on:headerClick={handleHeaderClick} /><Toggle visible={dialogVis}><div transition:fade><Dialog on:close={handleDialogClose}/></div></Toggle>
  <div class="container text-center mx-auto px-3 ">
  <Toggle visible={false}><div transition:fade><Dialog/></div></Toggle>
  <img class="pt-10 pb-4"
      id="blogo"
      src="/wm_logo.png"
      alt="Walmart Logo"
  />
      
  <p contenteditable="false">WAL*MART</p>
  <p contenteditable="true">VANCOUVER,WA</p>
        <p contenteditable="true">360-258-2654 Mgr:TROY</p>
        <p>ST# 05461 OP# 001776 TE# 67 TR# 04809</p>
        
  </div>
  </section>
  <section>
    <List  />
    <Total />
    
  </section>
  <style lang='scss'>
    @import './styles.scss';
  
  section {
  
    display:flex;
    flex-direction:column;
  width: 100vw;
  }
  #blogo {
    width:85vw;
    display:flex;
    margin:auto;
  }
  p {
    font-weight:600;
  text-decoration:none;
  }
  Header {
  position:fixed;
  top:0;}
  .container {
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    width:100vw;
  }
  
  
  </style>
  