let x = 0
let angulo = 0
let direccion = ""
// Función para obtener la dirección de la brújula
function get_direccion (angulo: number) {
    if (45 <= angulo && angulo < 135) {
        return "E"
    } else if (135 <= angulo && angulo < 225) {
        // Este
        return "S"
    } else if (225 <= angulo && angulo < 315) {
        // Sur
        return "O"
    } else {
        // Oeste
        return "N"
    }
}
// Norte
// Función para controlar el movimiento del Maqueen
function controlar_maqueen (x: number, direccion: string) {
    // Si la aceleración en el eje X es mayor o igual a 200 (movimiento hacia la derecha)
    if (x >= 200) {
        // Mostrar flecha derecha
        basic.showString("→")
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        // Motor M1 avanza
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
    } else if (x <= -200) {
        // Motor M2 avanza
        // Si la aceleración en el eje X es menor o igual a -200 (movimiento hacia la izquierda)
        // Mostrar flecha izquierda
        basic.showString("←")
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
        // Motor M1 retrocede
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
    } else {
        // Motor M2 retrocede
        // Si no hay aceleración significativa, mostrar la dirección cardinal
        basic.showString(direccion)
        // El Maqueen sigue avanzando en función de la dirección
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    }
}
// Loop principal
basic.forever(function () {
    // Obtener la aceleración en el eje X (medida en mg)
    x = input.acceleration(Dimension.X)
    // Obtener el ángulo de la brújula (medido en grados)
    angulo = input.compassHeading()
    // Obtener la dirección basada en el ángulo
    direccion = get_direccion(angulo)
    // Controlar el Maqueen en función de la aceleración y dirección
    controlar_maqueen(x, direccion)
    // Pausa entre lecturas
    basic.pause(500)
})
