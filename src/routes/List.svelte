<script>
    import {items} from './store';
   
</script>
<div class="container mx-auto ">
    <div class="row flex mx-auto">
        <ul class="name">
            {#each $items as item }
            <p>{item.name}</p>
            {/each}

        </ul>
        <ul class="upc">
            {#each $items as item}
            <p>{item.upc}</p>
            {/each}

        </ul>
        <ul class="price">
            {#each $items as item}
            <p>{item.price} X</p>
            {/each}
        </ul>
    </div>
    
</div>
<style lang='scss'>

    @import './styles.scss';
    p{
        font-weight: 600;
    }
.container {
    
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width:100vw;
}
.row {
    width:80vw;
    display:flex;
    justify-content: space-between;
}
ul {
    text-align: start;
}
</style>