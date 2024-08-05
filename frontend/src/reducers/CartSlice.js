import  { createSlice } from "@reduxjs/toolkit"

const CartSlice = createSlice(
    {
        name : "Cart", 
        initialState :{
            data:[],
            total:0 ,
        },
        reducers:{
            addToCart(currentState , {payload}){
                const d = currentState.data.find(cart => cart.pId === payload.pId);
                if(d){
                    d.qty++;
                }
                else{
                    currentState.data.push({pId:payload.pId, qty:payload.qty});
                }
                currentState.total += payload.price ;
                //local storage me daalna
                localStorage.setItem("cart", JSON.stringify(currentState))
             },
            removeFromCart(currentState,{payload})
            {
                // payload me pId , total price
                const newState = currentState.data.filter(
                    (d)=>{
                        return d.pId != payload.pId
                    }
                )
                currentState.data = newState;
                currentState.total -= parseFloat(payload.total_price)
                localStorage.setItem("cart", JSON.stringify(currentState));

            },
            changeCartQty(currentState , {payload}){
                //payload me price , flag (true->add false ->subtr)
                const d = currentState.data.find(d => d.pId == payload.pId);
                
                if(payload.flag)
                {
                    d.qty++;
                    currentState.total += payload.price;
                }
                else{
                    if(d.qty>1){
                        d.qty--;
                        currentState.total -= payload.price;
                    }
                }
                localStorage.setItem("cart", JSON.stringify(currentState));
                
            },
            lsToCart(currentState){
                //local storage me se data fetch karna
                const lsCart = localStorage.getItem("cart");
                if(lsCart != null){
                    const d = JSON.parse(lsCart);
                    currentState.data = d.data;
                    currentState.total = d.total;
                }
            },
            emptyCart(currentState){
                currentState.data = [];
                currentState.total = 0 ;
                localStorage.removeItem("cart");
                //clearing all local storage cart data when cart is empty
            },
            dbtoCart(currentState,{payload}){
                currentState.data = payload.data;
                currentState.total = payload.total;

                localStorage.setItem("cart", JSON.stringify(currentState));
            }
        }
    }
)
export const {
  addToCart,
  removeFromCart,
  dbtoCart,
  changeCartQty,
  lsToCart,
  emptyCart,
} = CartSlice.actions; ;
export default CartSlice.reducer