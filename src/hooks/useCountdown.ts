import { useState, useEffect } from "react";
import { getTimeRemaining } from "../utils/getTimeRemaining";

export function useCountdown(deadline: Date, taskCompleted: boolean) {
    const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining(deadline)); //"lazy initial state" para no ejecutar getTimeRemaining en cada render 

    useEffect(() => {
        if (taskCompleted) return; //Si la tarea esta completada, no muestro el contador 

        const interval = setInterval(() => {
            const result = getTimeRemaining(deadline);  //llamo a la funcion getTimeRemaining para obtener el tiempo restante
            setTimeRemaining(result);  //actualizo el estado con el tiempo restante

            if (result.expired) {
                clearInterval(interval);  //limpio el intervalo cuando el tiempo expira
            }
        }, 1000);

        return () => clearInterval(interval);  //el cleanup limpia el intervalo cuando el componente se desmonta o cuando el deadline cambia
    }, [deadline, taskCompleted]); //la dependency array hace que el efecto se ejecute solo cuando el deadline cambia

    return timeRemaining;
}