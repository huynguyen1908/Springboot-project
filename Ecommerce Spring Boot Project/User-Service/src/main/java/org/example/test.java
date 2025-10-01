package org.example;

import java.awt.event.WindowStateListener;

public class test {

    public static void main (String[] args) {
        String testTryCatch = "outside";
        try {
            String inside = "in test";
            String job = "job";
            if (job.isEmpty()) {
                testTryCatch = "inside";
                throw new Exception("test");
            }else {
                throw new RuntimeException("test runtime");
            }
        } catch (RuntimeException e) {
            System.out.println("Runtime exception");
            System.out.println("Do job");
            System.out.println(e.getMessage());
        }
        catch (Exception e) {
            System.out.println(testTryCatch + " get in catch");
//            System.out.println(inside);
        }
    }
}
