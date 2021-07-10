import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { pathOr, head,equals } from 'ramda';

const App = () => {
 
  const [data, setData] = useState([
    {
      id: 'par1',
      title: 'Standard Normal Variate Transformation and De-Trending of Near-Infrared Diffuse Reflectance Spectra',
      body: 'Barnes RJ, Dhanoa MS, Lister SJ (1989) Standard normal variate transformation and de-trending of near-infrared diffuse reflectance spectra. Appl Spectrosc 43(5):777',
      appendedData: '',
      disabled: false
    }, {
      id: 'para2',
      title: 'Prediction of water-holding capacity and composition of porcine meat by comparative spectroscopy',
      body: 'Brùndum J, Munck L, Henckel P, Karlsson A, Tornberg E, Engelsen SB (2000) Prediction of water-holding capacity and composition of porcine meat by comparative spectroscopy. Meat Sci 55(2):185,',
      appendedData: '',
      disabled: false
    }, {
      id: 'par3',
      title: 'FT-NIR Spectroscopy and Wood Identification',
      body: 'Brunner M, Eugster R, Trenka E, Bergamin-Strotz L (1996) FT-NIR spectroscopy and wood identification. Holzforschung 50(2):134',
      appendedData: '',
      disabled: false
    }, {
      id: 'par4',
      title: 'Wood species identification by near-infrared spectroscopy',
      body: 'Lazarescu C, Hart F, Pirouz Z, Panagiotidis K, Mansfield SD, Barrett JD,Avramidis S (2017) Wood species identification by near-infrared spectroscopy. International Wood Products Journal 8(1):32–35',
      appendedData: '',
      disabled: false
    }, {
      id: 'par5',
      title: 'Rapid spectroscopic separation of three Canadian softwoods',
      body: 'Dawson-Andoh B, Adedipe OE (2012) Rapid spectroscopic separation of three Canadian softwoods. Wood Sci Technol 46(6):1202',
      appendedData: '',
      disabled: false
    },
    {
      id: 'par6',
      title: 'Feasibility of near-infrared spectroscopy for online multiple trait assessment of sawn lumber',
      body: 'Fujimoto T, Kurata Y, Matsumoto K, Tsuchikawa S (2010) Feasibility of near-infrared spectroscopy for online multiple trait assessment of sawn lumber. J Wood Sci 56(6):459',
      appendedData: '',
      disabled: false
    },
    {
      id: 'par7',
      title: 'Nondestructive estimation of wood chemical composition of sections of radial wood strips by diffuse reflectance near infrared spectroscopy',
      body: 'Jones PD, Schimleck LR, Peter GF, Daniels RF III (2006) Nondestructive estimation of wood chemical composition of sections of radial wood strips by diffuse reflectance near infrared spectroscopy. Wood Sci Technol 40(8):720',
      appendedData: '',
      disabled: false
    },
    {
      id: 'par8',
      title: 'Wood species identification by near-infrared spectroscopy',
      body: 'Lazarescu C, Hart F, Pirouz Z, Panagiotidis K, Mansfield SD, Barrett JD, Avramidis S (2017) Wood species identification by near-infrared spectroscopy. International Wood Products Journal 8(1):35',
      appendedData: '',
      disabled: false
    },
    {
      id: 'par9',
      title: 'Near infrared spectroscopic investigation of the thermal degradation of wood',
      body: 'Mehrotra R, Singh P, Kandpal H (2010) Near infrared spectroscopic investigation of the thermal degradation of wood. Thermochim Acta 507–508:65',
      appendedData: '',
      disabled: false
    },
    {
      id: 'par10',
      title:'Nondestructive measurement of fruit and vegetable quality by means of NIR spectroscopy: A review',
      body: 'Nicolaï BM, Beullens K, Bobelyn E, Peirs A, Saeys W, I.Theron K, Lammertyn J (2007) Nondestructive measurement of fruit and vegetable quality by means of NIR spectroscopy: a review. Postharvest biol technol 46(2):118',
      appendedData: '',
      disabled: false
    }
  ]);
  
  const baseURL = "https://api.crossref.org";

  async function handleSubmit(inputData, index) {
    const inputTitle  = pathOr('',['title'],inputData);
    const inputBody = pathOr('',['body'],inputData);
     try {
      const response = await axios.get(baseURL + `/works?sort=score&order=desc&rows=20&query.bibliographic=${inputBody}`)
       const itemsData = head(pathOr('', ['data', 'message', 'items'], response));
       const title = head(pathOr('', ['title'], itemsData));

       if (equals(title, inputTitle)) {
        const DOI = pathOr('', ['DOI'], itemsData);
        const appendData = `${inputBody} DOI: ${DOI}`;
        const items = [...data];
        const item = { ...items[index], appendedData: appendData, disabled: true }
        items[index] = item;
        setData(items)
      }
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div className="container my-5">
      <div className="main border border-dark">
        {data && data.map((currentData, index) => {
          
          const currentId = pathOr('',['id'],currentData);
          const currentTitle= pathOr('',['title'],currentData);
          const currentBody= pathOr('',['body'],currentData);
          const currentAppendedData= pathOr('',['appendedData'],currentData);
          const currentDisabled= pathOr('',['disabled'],currentData)

          return (
            <div className="row p-5" key={index}>
              <div className="col-lg-8">
                <div className="para" id={currentId} title={currentTitle}>
                  {currentBody}
                </div>
                <div className="para pt-5" >
                  {currentAppendedData}
                </div>
              </div>
              <div className="col-lg-4">
                <button type="button" disabled={currentDisabled} onClick={() => handleSubmit(currentData, index)} className="btn btn-primary">CrossRef Check</button>
              </div>
            </div>
          )
        }
        )
        }
      </div>
    </div>


  )
}

export default App;
