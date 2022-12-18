import { useParams } from "react-router-dom";
import { Accordion,AccordionSummary,AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import "./Company.css";
import { useEffect } from "react";

//prikazni primjer 
const companyInfo={"podrucje":"IT","ABC":"A","mjesec":"4.","drzava":"Hrvatska"
                    ,"postBr":"10000","grad":"Zagreb","link":"https://firma.com"}
const companyContacts=[{"name":"Javor","surname":"Javorčević","mail":"javor.javorcevic@gmail.com","phone":"098776224","position":"HR specialist"},
                        {"name":"Javora","surname":"Javorčević","mail":"javora.javorcevic@gmail.com","phone":"098772452" ,"position":"CEO"},
                        {"name":"Javora","surname":"Javorčević","mail":"javora.javorcevic@gmail.com","phone":"098772452" ,"position":"CEO"},
                        {"name":"Javora","surname":"Javorčević","mail":"javora.javorcevic@gmail.com","phone":"098772452" ,"position":"CEO"},
                        {"name":"Javora","surname":"Javorčević","mail":"javora.javorcevic@gmail.com","phone":"098772452" ,"position":"CEO"}]
                        const Collabs = [{"naziv":"Projekt 1", "kategorija":"Hackhaton","tip":"interni","datumPoc":"2.12.2021","datumKraj":"8.1.2022","FrResponsible":"MladiGljivor","FrCilj":"10000kn","FrTeam":["marko","ana","ivan"],"prviping":"6.12.2022","drugiping":"3.1.2023","ostaleKompanije":["Microsoft","Apple"]},
                        {"naziv":"Projekt 2", "kategorija":"Hackhaton","tip":"interni","datumPoc":"2.12.2021","datumKraj":"8.1.2022","FrResponsible":"MladiGljivor","FrCilj":"10000kn","FrTeam":["marko","ana","ivan"],"prviping":"6.12.2022","drugiping":"3.1.2023","ostaleKompanije":["Microsoft","Apple"]}    ]
export default function Company() {
    const params = useParams()

    useEffect(() => {
        console.log(params.companyName)
        //TODO kada se napravi api za companies
        //pozvati get req za company info gdje je company name ==params.companyName primjer:fetch("localhost:8080/getCompany/params.companyName") vraca companyinfo i company Contacts
        //pozvati req za sve collabove u kojima je company name sudjelovao
        // rezultate pohraniti u state 
        
      }, []);
  return (
    <>
    <div className="companyAll">
        <div className="left">
            <p className="name bigger"> {params.companyName}</p>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>Info</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography><div className="info">
                                    <div> Podrucje: {companyInfo.podrucje}</div>
                                    <div> ABC: {companyInfo.ABC}</div>
                                    <div>  Mjesec: {companyInfo.mjesec}</div>
                                    <div>  Drzava: {companyInfo.drzava}</div>
                                    <div>  PostBr: {companyInfo.postBr}</div>
                                    <div>  Grad: {companyInfo.grad}</div>
                                    <div>  Web stranica: {companyInfo.link}</div>
                                </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        

        
            
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>Company Contacts</Typography>
                </AccordionSummary>
                <AccordionDetails className="scale">
                    <Typography><div className="grid">
                                    
                                    {companyContacts.map((contact)=>(<div className="info" key={contact.mail}>
                                                                            <div> Name: {contact.name}</div>
                                                                            <div> Surname: {contact.surname}</div>
                                                                            <div>  Mail: {contact.mail}</div>
                                                                            <div>  Phone: {contact.phone}</div>
                                                                            <div>  Position: {contact.position}</div>
                                                                           
                                                                    </div>))}

                                </div>
                    </Typography>
                                
                </AccordionDetails>
            </Accordion>
        </div>

        <div className="right">
            <p className="name ">Collaborations</p>
            
        

        
            {Collabs.map((collab)=>(
                 <Accordion>
                 <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                 <Typography>{collab.naziv}</Typography>
                 </AccordionSummary>
                 <AccordionDetails>
                     <Typography>
                     <div className="info" key={collab.naziv}>
                                                                            <div> Kategorija: {collab.kategorija}</div>
                                                                            <div> Tip: {collab.tip}</div>
                                                                            <div>  Datum Pocetka: {collab.datumPoc}</div>
                                                                            <div>  Datum Kraja: {collab.datumKraj}</div>
                                                                            <div>  Fr Responsible: {collab.FrResponsible}</div>
                                                                            <div>  Fr Team: {collab.FrTeam.map((member)=>(<div key={member}>-{member} </div>))}</div>
                                                                            <div>  Fr cilj: {collab.FrCilj}</div>
                                                                            <div>  Prvi ping: {collab.prviping}</div>
                                                                            <div>  Drugi ping: {collab.drugiping}</div>
                                                                            <div>  Ostale firme na projektu: {collab.ostaleKompanije.map((kompanija)=>(<div key={kompanija}>-{kompanija} </div>))}</div>
                                                                           
                                                                    </div>
                     </Typography>
                 </AccordionDetails>
             </Accordion>
            ))}
           
        </div>
        
      
    </div>
    </>
  );
}
