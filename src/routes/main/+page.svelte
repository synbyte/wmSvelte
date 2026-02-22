<script>



  import Header from "../Header.svelte";


  import List from "../List.svelte";


  import Total from "../Total.svelte";


  import Dialog from "../Dialog.svelte";


  import Toggle from "../Toggle.svelte";


  


  import { fade } from 'svelte/transition';


  


  let dialogVis = false;


  


  function handleHeaderClick() {


      dialogVis = !dialogVis;


  }


  


  function handleDialogClose() {


      dialogVis = false;


  }


  // Pan-Zoom Logic
  function panzoom(node) {
    let scale = 1;
    let x = 0;
    let y = 0;
    let pointers = new Map();
    let initialDist = 0;
    let initialScale = 1;
    let initialMidpoint = { x: 0, y: 0 };

    function getMidpoint(p1, p2) {
      return {
        x: (p1.clientX + p2.clientX) / 2,
        y: (p1.clientY + p2.clientY) / 2
      };
    }

    function update() {
      node.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }

    function onDown(e) {
      pointers.set(e.pointerId, e);
      if (pointers.size === 2) {
        const p = Array.from(pointers.values());
        initialDist = Math.hypot(p[1].clientX - p[0].clientX, p[1].clientY - p[0].clientY);
        initialScale = scale;
        initialMidpoint = getMidpoint(p[0], p[1]);
      }
    }

    function onMove(e) {
      if (!pointers.has(e.pointerId)) return;
      const prev = pointers.get(e.pointerId);
      pointers.set(e.pointerId, e);

      if (pointers.size === 1) {
        x += e.clientX - prev.clientX;
        y += e.clientY - prev.clientY;
      } else if (pointers.size === 2) {
        const p = Array.from(pointers.values());
        const dist = Math.hypot(p[1].clientX - p[0].clientX, p[1].clientY - p[0].clientY);
        const mid = getMidpoint(p[0], p[1]);
        
        const nextScale = initialScale * (dist / initialDist);
        const scaleChange = nextScale / scale;
        
        // Zoom towards midpoint
        x = mid.x - (mid.x - x) * scaleChange;
        y = mid.y - (mid.y - y) * scaleChange;
        scale = nextScale;
      }
      update();
    }

    function onUp(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) initialDist = 0;
    }

    node.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    
    node.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = -e.deltaY;
      const factor = Math.pow(1.1, delta / 100);
      const nextScale = scale * factor;
      
      const mid = { x: e.clientX, y: e.clientY };
      const scaleChange = nextScale / scale;
      x = mid.x - (mid.x - x) * scaleChange;
      y = mid.y - (mid.y - y) * scaleChange;
      scale = nextScale;
      update();
    }, { passive: false });

    return {
      destroy() {
        node.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
      }
    };
  }
</script>

<Header on:headerClick={handleHeaderClick} />

<Toggle visible={dialogVis}>
  <div class="dialog-overlay" transition:fade>
    <Dialog on:close={handleDialogClose}/>
  </div>
</Toggle>

<main class="viewport">
  <div class="panzoom-layer" use:panzoom>
    <div class="receipt-content">
      <section>
        <div class="container text-center mx-auto px-3">
          <img class="pt-10 pb-4"
              id="blogo"
              src="/wm_logo.png"
              alt="Walmart Logo"
          />
          <p contenteditable="false">WM Supercenter</p>
         
          <p contenteditable="true">360-258-2654 Mgr:TROY</p>
          <p>ST# 05461 OP# 001776 TE# 67 TR# 04809</p>
        </div>
      </section>

      <section>
        <List />
        <Total />
      </section>
    </div>
  </div>
</main>

<style lang='scss'>


  @import '../styles.scss';





  :global(body) {
    overflow: hidden;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }

  .viewport {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: white;
    position: relative;
    touch-action: none;
  }

  .panzoom-layer {
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }

  .receipt-content {
    background: white;
    min-height: 100vh;
    width: 100vw;
    padding-top: 60px; /* Offset for header */
  }

  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  section {


    display:flex;


    flex-direction:column;


    width: 100%;
  }


  #blogo {


    width: 100%;
    display:flex;


    margin:auto;


  }


  p {


    font-weight:600;


    text-decoration:none;


  }


  Header {


    position:fixed;


    top:0;


  }


  .container {


    display:flex;


    flex-direction: column;


    justify-content: space-between;


    width: 100%;
  }


</style>