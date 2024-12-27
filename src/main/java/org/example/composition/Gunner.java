package org.example.composition;

public class Gunner extends Character{
    public Gunner(int health, Weapon weapon) {
        super(health, weapon);
    }

    @Override
    public void attack(Character target) {
        System.out.println("Gunner Attack");
        target.takeDamage(weapon.attack());
    }

    @Override
    public void specialAttack(Character target) {
        System.out.println("Gunner Attack");
        target.health -= weapon.specialAttack();
    }

    @Override
    public void takeDamage(int amount) {
        health -= amount;
    }

}