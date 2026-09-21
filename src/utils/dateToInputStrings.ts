export function dateToInputStrings(date: Date): { datePart: string; timePart: string } {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0") //el +1 es porque getMonth devuelve el mes en formato numerico comenzando desde el indice 0 = Enero. 
    const day = String(date.getDate()).padStart(2, "0") //padStart es para que el dia tenga 2 digitos, por ejemplo el 9 se convierte en 09.

    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return {
        datePart: `${year}-${month}-${day}`,
        timePart: `${hours}:${minutes}`,
    };
}