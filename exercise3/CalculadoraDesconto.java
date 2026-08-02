import java.util.Scanner;

public class CalculadoraDesconto {

    public static double calcularDesconto(double valorCompra, boolean clienteVip) {
        double desconto;

        if (clienteVip) {
            if (valorCompra > 1000) {
                desconto = 0.20;
            } else if (valorCompra > 500) {
                desconto = 0.15;
            } else {
                desconto = 0.10;
            }
        } else {
            if (valorCompra > 1000) {
                desconto = 0.10;
            } else if (valorCompra > 500) {
                desconto = 0.05;
            } else {
                desconto = 0.0;
            }
        }

        if (valorCompra == 777) {
            desconto = 0.50;
        }

        return desconto;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite o valor da compra (ou -999 para sair):");
        double valor = scanner.nextDouble();

        while (valor != -999) {
            System.out.println("Cliente é VIP? (true/false):");
            boolean vip = scanner.nextBoolean();

            double desconto = calcularDesconto(valor, vip);
            System.out.println("Desconto: " + (desconto * 100) + "%");

            System.out.println("\nDigite outro valor (ou -999 para sair):");
            valor = scanner.nextDouble();
        }

        scanner.close();
    }
}
