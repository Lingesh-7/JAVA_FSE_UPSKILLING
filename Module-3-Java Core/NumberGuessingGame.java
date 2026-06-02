import java.util.Random;
import java.util.Scanner;

public class NumberGuessingGame {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        Random r = new Random();

        int target = r.nextInt(100) + 1;
        int guess;

        do{
            guess = sc.nextInt();

            if(guess > target)
                System.out.println("Too High");
            else if(guess < target)
                System.out.println("Too Low");

        }while(guess != target);

        System.out.println("Correct");
    }
}