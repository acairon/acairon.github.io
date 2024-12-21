#include <stdio.h>

// Declaración de funciones
float sumar(float a, float b);
float restar(float a, float b);
float multiplicar(float a, float b);
float dividir(float a, float b);

int main() {
    int opcion;
    float num1, num2, resultado;

    printf("¡Bienvenido a la calculadora!\n");

    do {
        // Menú de opciones
        printf("\n----- Menú -----\n");
        printf("1. Sumar\n");
        printf("2. Restar\n");
        printf("3. Multiplicar\n");
        printf("4. Dividir\n");
        printf("5. Salir\n");
        printf("Seleccione una opción: ");
        scanf("%d", &opcion);

        if (opcion >= 1 && opcion <= 4) {
            // Pedir números al usuario
            printf("Ingrese el primer número: ");
            scanf("%f", &num1);
            printf("Ingrese el segundo número: ");
            scanf("%f", &num2);
        }

        // Procesar la opción seleccionada
        switch (opcion) {
            case 1:
                resultado = sumar(num1, num2);
                printf("El resultado de la suma es: %.2f\n", resultado);
                break;
            case 2:
                resultado = restar(num1, num2);
                printf("El resultado de la resta es: %.2f\n", resultado);
                break;
            case 3:
                resultado = multiplicar(num1, num2);
                printf("El resultado de la multiplicación es: %.2f\n", resultado);
                break;
            case 4:
                if (num2 != 0) {
                    resultado = dividir(num1, num2);
                    printf("El resultado de la división es: %.2f\n", resultado);
                } else {
                    printf("Error: División por cero no permitida.\n");
                }
                break;
            case 5:
                printf("Saliendo de la calculadora...\n");
                break;
            default:
                printf("Opción no válida. Intente de nuevo.\n");
                break;
        }
    } while (opcion != 5);

    return 0;
}

// Definiciones de funciones
float sumar(float a, float b) {
    return a + b;
}

float restar(float a, float b) {
    return a - b;
}

float multiplicar(float a, float b) {
    return a * b;
}

float dividir(float a, float b) {
    return a / b;
}
