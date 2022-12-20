<script>
import Header from "./Header.svelte";
</script>

<section>
<Header />

<div class="container mx-auto px-3 ">
<img class="pt-10 pb-4"
        id="blogo"
        src="https://i.ibb.co/vLHzdzM/pngfind-com-walmart-logo-png-572731.png"
      />
      <p>360-258-2654</p>
      <p>ST# 05461 OP# 001776 TE# 67 TR# 04809</p>
</div>
</section>
<style>
section {
	display:flex;
	flex-direction:column;

}
#blogo {
  width:80vw;
  display:flex;
  margin:auto;
}
.row {

}
.container {
  font-family: "Courier Prime", monospace;
  font-size:0.9em;
  text-align: center;
 
}
p {
  font-weight: 600;
}

</style>