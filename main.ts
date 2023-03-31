function Motores (Izq: number, Der: number) {
    OmniBit.MotorRun(OmniBit.enMotors.M1, Izq)
    OmniBit.MotorRun(OmniBit.enMotors.M2, Izq)
    OmniBit.MotorRun(OmniBit.enMotors.M3, Der)
    OmniBit.MotorRun(OmniBit.enMotors.M4, Der)
}
function leer_datos () {
    x_incio = huskylens.readeArrow(1, Content2.xOrigin)
    x_fin = huskylens.readeArrow(1, Content2.xTarget)
    y_min = huskylens.readeArrow(1, Content2.yOrigin)
    y_max = huskylens.readeArrow(1, Content2.yTarget)
}
function calcula () {
    X_corregida = x_incio - 160
    dist_y = y_min - y_max
    potencia = potencia_max * dist_y / 240
    if (potencia <= 50) {
        potencia = 10
        if (X_corregida > 0) {
            X_corregida = 60
        } else {
            X_corregida = -60
        }
    }
    motor_der = potencia - X_corregida
    motor_izq = potencia + X_corregida
    memoria = X_corregida
}
let memoria = 0
let motor_izq = 0
let motor_der = 0
let potencia = 0
let dist_y = 0
let X_corregida = 0
let y_max = 0
let y_min = 0
let x_fin = 0
let x_incio = 0
let potencia_max = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
OmniBit.MotorStopAll()
serial.redirectToUSB()
let varia = 80
let potencia_min = 50
potencia_max = 150
basic.forever(function () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultArrow)) {
        leer_datos()
        calcula()
        Motores(motor_izq, motor_der)
    } else {
        if (X_corregida > 0) {
            Motores(50, -50)
        } else {
            Motores(-50, 50)
        }
    }
})
