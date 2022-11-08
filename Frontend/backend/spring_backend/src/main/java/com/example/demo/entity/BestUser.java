package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table(name="BestUser")
public class BestUser {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="bestUser_id")
    private Long id;
    @Column(name="bestUser_ime")
    private String ime;
    @Column(name="bestUser_prezime")
    private String prezime;
    @Column(name="bestUser_spol")
    private String spol;
    @Column(name="bestUser_opis")
    private String opis;

    public BestUser(Long id, String ime, String spol, String prezime, String opis) {
        this.id = id;
        this.ime = ime;
        this.spol = spol;
        this.prezime = prezime;
        this.opis = opis;
    }

    public BestUser() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getSpol() {
        return spol;
    }

    public void setSpol(String spol) {
        this.spol = spol;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }
}

