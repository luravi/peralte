# Función para obtener la dirección de la brújula
def get_direccion(angulo):
    if 45 <= angulo < 135:
        return 'E'  # Este
    elif 135 <= angulo < 225:
        return 'S'  # Sur
    elif 225 <= angulo < 315:
        return 'O'  # Oeste
    else:
        return 'N'  # Norte

# Función para controlar el movimiento del Maqueen
def controlar_maqueen(x, direccion):
    # Si la aceleración en el eje X es mayor o igual a 200 (movimiento hacia la derecha)
    if x >= 200:
        # Mostrar flecha derecha
        basic.show_string("→")
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 50)  # Motor M1 avanza
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 50)  # Motor M2 avanza
    # Si la aceleración en el eje X es menor o igual a -200 (movimiento hacia la izquierda)
    elif x <= -200:
        # Mostrar flecha izquierda
        basic.show_string("←")
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 50)  # Motor M1 retrocede
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 50)  # Motor M2 retrocede
    else:
        # Si no hay aceleración significativa, mostrar la dirección cardinal
        basic.show_string(direccion)
        # El Maqueen sigue avanzando en función de la dirección
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 50)

# Loop principal
def on_forever():
    # Obtener la aceleración en el eje X (medida en mg)
    x = input.acceleration(Dimension.X)
    # Obtener el ángulo de la brújula (medido en grados)
    angulo = input.compass_heading()
    # Obtener la dirección basada en el ángulo
    direccion = get_direccion(angulo)

    # Controlar el Maqueen en función de la aceleración y dirección
    controlar_maqueen(x, direccion)

    # Pausa entre lecturas
    basic.pause(500)

basic.forever(on_forever)
