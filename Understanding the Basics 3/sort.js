const sorting = (arr) =>{
    res = [];
    for (let i = 0; i < arr.length; i++) {
        if(i === 0) res.push(arr[i]);

        for (let j = 0; j < res.length; j++) {
            // si el numero es mayor a el numero recorrido por 
            //el resultado que llevamos, este se inserta en la posicion 
            //Error: Si el numero es menor no se guarda y sigue buscando numeros mayores
            if(arr[i] > res[j]){
                res.splice(j,0,arr[i])
            }            
        }
    }

    return res;
}
    
console.log(
    sorting([31,2,42].sort())
)