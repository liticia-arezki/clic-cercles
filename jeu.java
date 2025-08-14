import java.util.Scanner;
import java.util.Random;

public class Jeu {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random rand = new Random();
        System.out.print("Entrez votre nom : ");
        String name = sc.nextLine();
        int score = 0;

        for(int i=0;i<10;i++){ // 10 tours
            int circle = rand.nextInt(2); // 50% chance
            System.out.println("Cercle apparu ! Tapez 1 pour cliquer...");
            int input = sc.nextInt();
            if(input==1 && circle==1){
                score++;
                System.out.println("Bravo ! Score = "+score);
            } else {
                System.out.println("Manqué !");
            }
        }
        System.out.println("🎉 "+name+", votre score final : "+score);
    }
}
