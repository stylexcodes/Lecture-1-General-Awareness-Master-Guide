import React from 'react';
import { RootData } from './types';
import TonicitySVG from './components/TonicitySVG';
import SSCQuestion from './components/SSCQuestion';
import { Bi, BiLi, BiBox } from './components/Bi';

export const lectureData: RootData = {
  title: "Lecture 1: General Awareness",
  titleHi: "व्याख्यान 1: सामान्य जागरूकता",
  subtitle: "Comprehensive Master Guide for SSC Examinations",
  subtitleHi: "एसएससी परीक्षाओं के लिए व्यापक मास्टर गाइड",
  branches: [
    /* ====================================================================
       1. POLITY
    ==================================================================== */
    {
      id: "polity",
      title: "Polity",
      titleHi: "राजव्यवस्था",
      iconName: "Landmark",
      description: "Constitutional Assembly and Government Organs",
      descriptionHi: "संविधान सभा और सरकार के अंग",
      leaves: [
        {
          id: "constituent-assembly",
          title: "Constituent Assembly",
          titleHi: "संविधान सभा",
          content: (
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><span className="font-semibold text-slate-800">1934</span>: MN Roy first demanded a constituent assembly.</>}
                  hi={<><span className="font-semibold text-slate-800">1934</span>: एम.एन. रॉय ने पहली बार संविधान सभा की मांग की।</>}
                />
                <BiLi 
                  en={<>Constituent assembly formed under the <strong>Cabinet Mission Plan</strong>.</>}
                  hi={<>संविधान सभा का गठन <strong>कैबिनेट मिशन योजना</strong> के तहत किया गया।</>}
                />
                <BiLi 
                  en={<>Cabinet Mission Plan had <strong>3 British Cabinet Members</strong>: Pethick Lawrence (chairman), Stafford Cripps, AV Alexander.</>}
                  hi={<>कैबिनेट मिशन योजना में <strong>3 ब्रिटिश कैबिनेट सदस्य</strong> थे: पेथिक लॉरेंस (अध्यक्ष), स्टैफोर्ड क्रिप्स, ए.वी. अलेक्जेंडर।</>}
                />
                <BiLi 
                  en={<>Elections held in: <strong>July - August 1946</strong></>}
                  hi={<>चुनाव आयोजित: <strong>जुलाई - अगस्त 1946</strong></>}
                />
                <BiLi 
                  en={<><strong>Results:</strong> Majority: Congress (208 seats), Muslim League: 73 seats, Independent: 15 seats.</>}
                  hi={<><strong>परिणाम:</strong> बहुमत: कांग्रेस (208 सीटें), मुस्लिम लीग: 73 सीटें, निर्दलीय: 15 सीटें।</>}
                />
                <BiLi 
                  en={<>After boycott of Muslim League Remaining seats - <strong>299</strong> (after partition).</>}
                  hi={<>मुस्लिम लीग के बहिष्कार के बाद शेष सीटें - <strong>299</strong> (विभाजन के बाद)।</>}
                />
                <BiLi 
                  en={<>1st session: <strong>9-23 December 1946</strong> (211 members attended).</>}
                  hi={<>पहला सत्र: <strong>9-23 दिसंबर 1946</strong> (211 सदस्यों ने भाग लिया)।</>}
                />
              </ul>
            </div>
          ),
          tags: ["History", "Elections"],
          mermaidCode: `graph TD
    A["🏛️ Cabinet Mission Plan (1946)"] --> B["🗳️ 296 Elected<br/>(British India)"]
    A --> C["👑 93 Nominated<br/>(Princely States)"]
    B --> D["📍 292 from 11 Governor Provinces"]
    B --> E["📍 4 from Chief Commissioner Provinces<br/>(Delhi, Ajmer-Merwara, Coorg, British Baluchistan)"]
    
    style A fill:#0f2942,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style B fill:#1e3a8a,stroke:#60a5fa,stroke-width:1.5px,color:#ffffff
    style C fill:#4c1d95,stroke:#a78bfa,stroke-width:1.5px,color:#ffffff
    style D fill:#134e4a,stroke:#2dd4bf,stroke-width:1.5px,color:#ffffff
    style E fill:#701a75,stroke:#e879f9,stroke-width:1.5px,color:#ffffff`,
          mermaidCodeHi: `graph TD
    A["🏛️ कैबिनेट मिशन योजना (1946)"] --> B["🗳️ 296 निर्वाचित<br/>(ब्रिटिश भारत से)"]
    A --> C["👑 93 मनोनीत<br/>(देशी रियासतों से)"]
    B --> D["📍 292 (11 गवर्नर प्रांतों से)"]
    B --> E["📍 4 (मुख्य आयुक्त प्रांतों से)<br/>(दिल्ली, अजमेर-मारवाड़, कुर्ग, ब्रिटिश बलूचिस्तान)"]
    
    style A fill:#0f2942,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style B fill:#1e3a8a,stroke:#60a5fa,stroke-width:1.5px,color:#ffffff
    style C fill:#4c1d95,stroke:#a78bfa,stroke-width:1.5px,color:#ffffff
    style D fill:#134e4a,stroke:#2dd4bf,stroke-width:1.5px,color:#ffffff
    style E fill:#701a75,stroke:#e879f9,stroke-width:1.5px,color:#ffffff`,
          mermaidCodeBi: `graph TD
    A["🏛️ Cabinet Mission Plan • कैबिनेट मिशन योजना (1946)"] --> B["🗳️ 296 Elected (निर्वाचित)<br/>British India (ब्रिटिश भारत)"]
    A --> C["👑 93 Nominated (मनोनीत)<br/>Princely States (देशी रियासतें)"]
    B --> D["📍 292 from 11 Governor Provinces<br/>(11 गवर्नर प्रांतों से)"]
    B --> E["📍 4 Chief Commissioner Provinces<br/>(4 मुख्य आयुक्त प्रांतों से)"]
    
    style A fill:#0f2942,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style B fill:#1e3a8a,stroke:#60a5fa,stroke-width:1.5px,color:#ffffff
    style C fill:#4c1d95,stroke:#a78bfa,stroke-width:1.5px,color:#ffffff
    style D fill:#134e4a,stroke:#2dd4bf,stroke-width:1.5px,color:#ffffff
    style E fill:#701a75,stroke:#e879f9,stroke-width:1.5px,color:#ffffff`
        },
        {
          id: "drafting",
          title: "Drafting & Calligraphy",
          titleHi: "प्रारूपण और सुलेख (Drafting & Calligraphy)",
          content: (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img src="/Making of Indian constitution_.png" alt="Making of Indian Constitution" className="w-full h-auto object-cover bg-slate-900" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('div.error-msg')) {
                      const div = document.createElement('div');
                      div.className = 'error-msg p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2';
                      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>Making of Indian constitution_.png</b></span>';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>KM Munshi</strong>: Member of drafting committee, chairman of Order of Business Committee.</>}
                  hi={<><strong>के.एम. मुंशी</strong>: प्रारूप समिति के सदस्य, कार्य संचालन समिति के अध्यक्ष।</>}
                />
                <BiLi 
                  en={<>
                    <strong>Handwritten constitution by (Calligraphers)</strong>: 
                    <span className="block ml-6 text-slate-600 mt-1">
                      • English: Prem Bihari Narain Raizada<br/>
                      • Hindi: Vasant Krishna Vaidya
                    </span>
                  </>}
                  hi={<>
                    <strong>हस्तलिखित संविधान (सुलेखक)</strong>: 
                    <span className="block ml-6 text-slate-600 mt-1">
                      • अंग्रेजी: प्रेम बिहारी नारायण रायज़ादा<br/>
                      • हिंदी: वसंत कृष्ण वैद्य
                    </span>
                  </>}
                />
                <BiLi 
                  en={<>
                    <strong>Decorated by</strong>:
                    <span className="block ml-6 text-slate-600 mt-1">
                      • Nand Lal Bose<br/>
                      • Beohar Ram Manohar
                    </span>
                  </>}
                  hi={<>
                    <strong>सजावट (Decorated by)</strong>:
                    <span className="block ml-6 text-slate-600 mt-1">
                      • नंद लाल बोस<br/>
                      • ब्योहर राम मनोहर
                    </span>
                  </>}
                />
              </ul>
            </div>
          ),
          tags: ["Drafting", "People"]
        },
        {
          id: "organs",
          title: "Functions of Constituent Assembly & Organs of Government",
          titleHi: "संविधान सभा के कार्य और सरकार के अंग",
          content: (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800">
                <Bi 
                  en="2 Major functions of Constituent Assembly:" 
                  hi="संविधान सभा के 2 प्रमुख कार्य:" 
                />
              </h4>
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>Law making body (to legislate)</strong>: President - GV Mavlankar (first speaker of Lok Sabha). Vice president - TT Krishnamachari & HC Mukherjee.</>}
                  hi={<><strong>कानून बनाने वाली संस्था (विधायिका)</strong>: अध्यक्ष - जी.वी. मावलंकर (लोकसभा के पहले अध्यक्ष)। उपाध्यक्ष - टी.टी. कृष्णामाचारी और एच.सी. मुखर्जी।</>}
                />
                <BiLi 
                  en={<><strong>Constitution making</strong>: President - Rajendra Prasad (after election). Temporary president - Sachidanand Sinha (before election).</>}
                  hi={<><strong>संविधान निर्माण संस्था</strong>: अध्यक्ष - डॉ. राजेंद्र प्रसाद (चुनाव के बाद)। अस्थायी अध्यक्ष - सच्चिदानंद सिन्हा (चुनाव से पहले)।</>}
                />
              </ul>
            </div>
          ),
          tags: ["Governance", "Organs"],
          mermaidCode: `graph TD
    A["⚖️ Organs of the Government"]
    A -->|Law Making Body| B["🏛️ Legislature<br/>(Parliament / State Assemblies)"]
    A -->|Law Implementation| C["⚙️ Executive<br/>(President, PM & Council)"]
    A -->|Law Review & Justice| D["🛡️ Judiciary<br/>(Supreme Court & High Courts)"]
    
    style A fill:#0f2942,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style B fill:#881337,stroke:#fb7185,stroke-width:1.5px,color:#ffffff
    style C fill:#78350f,stroke:#fbbf24,stroke-width:1.5px,color:#ffffff
    style D fill:#064e3b,stroke:#34d399,stroke-width:1.5px,color:#ffffff`,
          mermaidCodeHi: `graph TD
    A["⚖️ सरकार के प्रमुख तीन अंग"]
    A -->|विधि निर्माण • कानून बनाना| B["🏛️ विधायिका (Legislature)<br/>(संसद व राज्य विधानमंडल)"]
    A -->|विधि क्रियान्वयन • लागू करना| C["⚙️ कार्यपालिका (Executive)<br/>(राष्ट्रपति, पीएम व मंत्रिपरिषद)"]
    A -->|विधि समीक्षा • न्यायपालिका| D["🛡️ न्यायपालिका (Judiciary)<br/>(सर्वोच्च व उच्च न्यायालय)"]
    
    style A fill:#0f2942,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style B fill:#881337,stroke:#fb7185,stroke-width:1.5px,color:#ffffff
    style C fill:#78350f,stroke:#fbbf24,stroke-width:1.5px,color:#ffffff
    style D fill:#064e3b,stroke:#34d399,stroke-width:1.5px,color:#ffffff`,
          mermaidCodeBi: `graph TD
    A["⚖️ Organs of Government • सरकार के अंग"]
    A -->|Law Making • विधि निर्माण| B["🏛️ Legislature (विधायिका)<br/>Law Making Body"]
    A -->|Implementation • क्रियान्वयन| C["⚙️ Executive (कार्यपालिका)<br/>Law Implementation"]
    A -->|Review • न्याय व समीक्षा| D["🛡️ Judiciary (न्यायपालिका)<br/>Law Review & Justice"]
    
    style A fill:#0f2942,stroke:#38bdf8,stroke-width:2px,color:#ffffff
    style B fill:#881337,stroke:#fb7185,stroke-width:1.5px,color:#ffffff
    style C fill:#78350f,stroke:#fbbf24,stroke-width:1.5px,color:#ffffff
    style D fill:#064e3b,stroke:#34d399,stroke-width:1.5px,color:#ffffff`
        }
      ]
    },

    /* ====================================================================
       2. GEOGRAPHY & SPACE
    ==================================================================== */
    {
      id: "geography",
      title: "Geography & Space",
      titleHi: "भूगोल और अंतरिक्ष",
      iconName: "Globe",
      description: "Universe, Solar System, and Earth's Geography",
      descriptionHi: "ब्रह्मांड, सौर मंडल और पृथ्वी का भूगोल",
      leaves: [
        {
          id: "universe",
          title: "Origin of Universe Theories",
          titleHi: "ब्रह्मांड की उत्पत्ति के सिद्धांत",
          content: (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img src="/Organ of Universe Theories_.png" alt="Origin of Universe Theories" className="w-full h-auto object-cover bg-slate-900" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('div.error-msg')) {
                      const div = document.createElement('div');
                      div.className = 'error-msg p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2';
                      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>Organ of Universe Theories_.png</b></span>';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>BIG BANG THEORY</strong>: Universe was created from an explosion (13.8 Billion years ago). Given by <strong>George Lemaitre</strong> (1931). <strong>Edward Hubble</strong> contributed (Increase in distance of celestial bodies).</>}
                  hi={<><strong>बिग बैंग सिद्धांत</strong>: ब्रह्मांड का निर्माण एक विस्फोट से हुआ था (13.8 बिलियन वर्ष पूर्व)। <strong>जॉर्ज लेमैत्रे</strong> (1931) द्वारा दिया गया। <strong>एडवर्ड हबल</strong> का योगदान (खगोलीय पिंडों की दूरी में वृद्धि)।</>}
                />
                <BiLi 
                  en={<><strong>Formation of our Solar system</strong>: 4.8 Billion years ago.</>}
                  hi={<><strong>हमारे सौर मंडल का निर्माण</strong>: 4.8 बिलियन वर्ष पूर्व।</>}
                />
                <BiLi 
                  en={<><strong>Nebular Theory, 1755</strong>: By Immanuel Kant. Modified by Laplace in 1796. <em>Nebula: a giant cloud of dust and gas.</em></>}
                  hi={<><strong>नेबुलर सिद्धांत, 1755</strong>: इमैनुएल कांट द्वारा। 1796 में लाप्लास द्वारा संशोधित। <em>नेबुला: धूल और गैस का विशाल बादल।</em></>}
                />
                <BiLi 
                  en={<><strong>Planetesimal theory, 1905</strong>: By Thomas Chamberlain & Forest Ray Moulton.</>}
                  hi={<><strong>ग्रहाणु सिद्धांत (Planetesimal theory), 1905</strong>: थॉमस चेम्बरलेन और फॉरेस्ट रे मौलटन द्वारा।</>}
                />
                <BiLi 
                  en={<><strong>Steady State theory</strong>: By Fred Hoyle, Hermann Bondi, Thomas Gold.</>}
                  hi={<><strong>स्थिर अवस्था सिद्धांत (Steady State theory)</strong>: फ्रेड हॉयल, हरमन बोंडी, थॉमस गोल्ड द्वारा।</>}
                />
              </ul>
              <BiBox 
                className="p-3.5 bg-blue-950/40 border border-blue-800/60 rounded-xl text-sm text-blue-200"
                en={<>
                  <strong>Study of Universe</strong>: Cosmology <br/>
                  <strong>Age of Universe</strong>: 13.8 Bn years <br/>
                  <strong>Study of celestial bodies</strong>: Astronomy
                </>}
                hi={<>
                  <strong>ब्रह्मांड का अध्ययन</strong>: कॉस्मोलॉजी (Cosmology) <br/>
                  <strong>ब्रह्मांड की आयु</strong>: 13.8 बिलियन वर्ष <br/>
                  <strong>खगोलीय पिंडों का अध्ययन</strong>: खगोल विज्ञान (Astronomy)
                </>}
              />
            </div>
          ),
          tags: ["Space", "Theories"]
        },
        {
          id: "solar-system",
          title: "Solar System & Planets",
          titleHi: "सौर मंडल और ग्रह",
          content: (
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>Rotation</strong>: Object's spinning motion about its axis.</>}
                  hi={<><strong>घूर्णन (Rotation)</strong>: किसी वस्तु की अपनी धुरी के परितः घूमने की गति।</>}
                />
                <BiLi 
                  en={<><strong>Revolution</strong>: Object's orbital motion around another object.</>}
                  hi={<><strong>परिक्रमण (Revolution)</strong>: किसी पिंड की दूसरे पिंड के चारों ओर कक्षीय गति।</>}
                />
                <BiLi 
                  en={<>
                    <strong>Planet Stats</strong>:
                    <span className="block ml-6 text-slate-600 mt-1">
                      • Longest Revolution: Neptune [165 years]<br/>
                      • Shortest Revolution: Mercury [88 days]<br/>
                      • Fastest Rotation: Jupiter<br/>
                      • Slowest Rotation: Venus
                    </span>
                  </>}
                  hi={<>
                    <strong>ग्रहों के आँकड़े</strong>:
                    <span className="block ml-6 text-slate-600 mt-1">
                      • सबसे लंबा परिक्रमण: नेपच्यून [165 वर्ष]<br/>
                      • सबसे छोटा परिक्रमण: बुध [88 दिन]<br/>
                      • सबसे तेज़ घूर्णन: बृहस्पति<br/>
                      • सबसे धीमा घूर्णन: शुक्र
                    </span>
                  </>}
                />
                <BiLi 
                  en={<><strong>Terrestrial Planets (Interior planets)</strong>: Made of rocks, higher density. (Mercury, Venus, Earth, Mars).</>}
                  hi={<><strong>पार्थिव ग्रह (आंतरिक ग्रह)</strong>: चट्टानों से बने, उच्च घनत्व वाले। (बुध, शुक्र, पृथ्वी, मंगल)।</>}
                />
                <BiLi 
                  en={<><strong>Jovian Planets (Exterior planets)</strong>: Less dense. Gas Giants (Jupiter, Saturn), Ice Giants (Uranus, Neptune).</>}
                  hi={<><strong>जोवियन ग्रह (बाहरी ग्रह)</strong>: कम घनत्व। गैस दानव (बृहस्पति, शनि), बर्फ दानव (यूरेनस, नेपच्यून)।</>}
                />
                <BiLi 
                  en={<><strong>Size Order (Decreasing)</strong>: Jupiter &gt; Saturn &gt; Uranus &gt; Neptune &gt; Earth &gt; Venus &gt; Mars &gt; Mercury.</>}
                  hi={<><strong>आकार का घटता क्रम</strong>: बृहस्पति &gt; शनि &gt; यूरेनस &gt; नेपच्यून &gt; पृथ्वी &gt; शुक्र &gt; मंगल &gt; बुध।</>}
                />
              </ul>
              
              <div className="mt-6 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img 
                  src="/Solar System.png" 
                  alt="Solar System Chart" 
                  className="w-full h-auto object-cover bg-slate-900"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      const div = document.createElement('div');
                      div.className = 'p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2';
                      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>Solar System.png</b></span>';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>
            </div>
          ),
          tags: ["Planets", "Astronomy"]
        },
        {
          id: "earth-zones",
          title: "Earth's Geography, Oceans & Lines",
          titleHi: "पृथ्वी का भूगोल, महासागर और रेखाएँ",
          content: (
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>Oceans (Largest to smallest)</strong>: 1. Pacific Ocean (Deepest), 2. Atlantic, 3. Indian, 4. Southern, 5. Arctic.</>}
                  hi={<><strong>महासागर (बड़े से छोटे)</strong>: 1. प्रशांत महासागर (सबसे गहरा), 2. अटलांटिक, 3. हिंद, 4. दक्षिणी, 5. आर्कटिक।</>}
                />
                <BiLi 
                  en={<><strong>Latitudes (Horizontal)</strong>: Line of latitude - 181. Latitude circle - 179. Distance between 1 degree = 111km. Equator divides earth into two equal parts (Great circle).</>}
                  hi={<><strong>अक्षांश (क्षैतिज)</strong>: कुल अक्षांश रेखाएँ - 181, अक्षांश वृत्त - 179। 1 डिग्री की दूरी = 111 किमी। भूमध्य रेखा पृथ्वी को दो बराबर भागों में विभाजित करती है (महान वृत्त)।</>}
                />
                <BiLi 
                  en={<><strong>Longitudes (Vertical)</strong>: All longitudes are great circles. Distance decreases as we move towards the pole. Max distance is at equator = 111.32km. Prime meridian = 0 degree longitude (Greenwich Mean Time).</>}
                  hi={<><strong>देशांतर (लंबवत)</strong>: सभी देशांतर महान वृत्त हैं। ध्रुवों की ओर बढ़ने पर दूरी घटती है। भूमध्य रेखा पर अधिकतम दूरी = 111.32 किमी। प्रधान मध्याह्न रेखा = 0° देशांतर (ग्रीनविच मीन टाइम)।</>}
                />
                <BiLi 
                  en={<><strong>International Date line</strong>: 180 degrees East/west. Passes through Pacific ocean (Alaska, Russia, Midway Is, Kiribati, Tonga, Chatham Is).</>}
                  hi={<><strong>अंतर्राष्ट्रीय तिथि रेखा</strong>: 180° पूर्व/पश्चिम। प्रशांत महासागर (अलास्का, रूस, मिडवे, किरिबाती, टोंगा, चैथम द्वीप समूह) से गुजरती है।</>}
                />
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                  <img src="/Line.png" alt="Latitude and Longitude Lines" className="w-full h-auto object-cover bg-slate-900" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent && !parent.querySelector('div.error-msg')) {
                        const div = document.createElement('div');
                        div.className = 'error-msg p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2 h-full justify-center';
                        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>Line.png</b></span>';
                        parent.appendChild(div);
                      }
                    }}
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                  <img src="/International Date Line.png" alt="International Date Line" className="w-full h-auto object-cover bg-slate-900" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent && !parent.querySelector('div.error-msg')) {
                        const div = document.createElement('div');
                        div.className = 'error-msg p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2 h-full justify-center';
                        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>International Date Line.png</b></span>';
                        parent.appendChild(div);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-xl">
                <h4 className="font-bold text-amber-300 mb-2">
                  <Bi en="Important latitudinal lines" hi="महत्वपूर्ण अक्षांश रेखाएँ" />
                </h4>
                <ul className="list-disc list-inside text-sm text-amber-100 space-y-1">
                  <BiLi 
                    en={<><strong>Torrid Zone</strong>: The direct rays of sun falls only between the Tropic of Cancer (23.5° N) and the Tropic of Capricorn (23.5° S).</>}
                    hi={<><strong>उष्णकटिबंधीय क्षेत्र</strong>: सूर्य की सीधी किरणें केवल कर्क रेखा (23.5° N) और मकर रेखा (23.5° S) के बीच ही पड़ती हैं।</>}
                  />
                  <BiLi 
                    en={<><strong>Arctic Circle</strong>: 66.5° N (North Temperate & Frigid zone).</>}
                    hi={<><strong>आर्कटिक वृत्त</strong>: 66.5° N (उत्तरी समशीतोष्ण और शीत कटिबंध)।</>}
                  />
                  <BiLi 
                    en={<><strong>Antarctic Circle</strong>: 66.5° S (South Temperate & Frigid zone).</>}
                    hi={<><strong>अंटार्कटिक वृत्त</strong>: 66.5° S (दक्षिणी समशीतोष्ण और शीत कटिबंध)।</>}
                  />
                </ul>
                <div className="mt-4 rounded-xl overflow-hidden shadow-sm border border-amber-800/40">
                  <img src="/Important Lines.png" alt="Important Latitudinal Lines" className="w-full h-auto object-cover bg-slate-900" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent && !parent.querySelector('div.error-msg')) {
                        const div = document.createElement('div');
                        div.className = 'error-msg p-6 text-center text-slate-300 bg-slate-900 border border-slate-800 flex flex-col items-center gap-2';
                        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>Important Lines.png</b></span>';
                        parent.appendChild(div);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ),
          tags: ["Earth", "Geography"]
        }
      ]
    },

    /* ====================================================================
       3. HISTORY
    ==================================================================== */
    {
      id: "history",
      title: "History",
      titleHi: "इतिहास",
      iconName: "Hourglass",
      description: "Ancient Ages and the Delhi Sultanate",
      descriptionHi: "प्राचीन युग और दिल्ली सल्तनत",
      leaves: [
        {
          id: "ages",
          title: "CJ Thomson 3 Age Classification",
          titleHi: "सी.जे. थॉमसन 3 युगीन वर्गीकरण",
          content: (
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<>
                    <strong>Stone Age</strong>: 
                    <span className="block ml-6 text-slate-600 mt-1">
                      • Paleolithic (old stone age): 5 lakh to 12000 BC<br/>
                      • Mesolithic (middle stone age): 12000 BC - 10000 BC (use of <em>Microliths</em> / small stones)<br/>
                      • Neolithic (new stone age): Pottery started here
                    </span>
                  </>}
                  hi={<>
                    <strong>पाषाण काल</strong>: 
                    <span className="block ml-6 text-slate-600 mt-1">
                      • पुरापाषाण काल: 5 लाख से 12000 ई.पू.<br/>
                      • मध्यपाषाण काल: 12000 ई.पू. - 10000 ई.पू. (<em>माइक्रोलिथ</em> / छोटे पत्थरों का उपयोग)<br/>
                      • नवपाषाण काल: यहाँ मृदभांड (बर्तन) निर्माण प्रारंभ हुआ
                    </span>
                  </>}
                />
                <BiLi 
                  en={<><strong>Bronze Age</strong>: Alloy of Copper + Tin [2500 BC - 1750 BC]</>}
                  hi={<><strong>कांस्य युग</strong>: तांबा + टिन का मिश्रधातु [2500 ई.पू. - 1750 ई.पू.]</>}
                />
                <BiLi 
                  en={<><strong>Iron Age</strong>: Megalithic in South India [1500 BC - 500 BC]</>}
                  hi={<><strong>लौह युग</strong>: दक्षिण भारत में महापाषाण काल [1500 ई.पू. - 500 ई.पू.]</>}
                />
              </ul>

              <BiBox 
                className="p-3.5 bg-blue-950/40 border border-blue-800/60 rounded-xl text-sm text-blue-200"
                en={<>
                  <strong>Pottery Timeline:</strong><br/>
                  • OCP (Ochre Colored pottery) - Neolithic age<br/>
                  • OCP/ BRW (Black &amp; Red Ware) - Chalcolithic age<br/>
                  • OCP/ BRW/ PGW (Painted Grey ware) - Harappa<br/>
                  • PGW/ NBPW (North Black Polished ware) - Iron age (Early to Later iron age)
                </>}
                hi={<>
                  <strong>मृदभांड (Pottery) समयरेखा:</strong><br/>
                  • OCP (गेरुए रंग के मृदभांड) - नवपाषाण काल<br/>
                  • OCP / BRW (काले और लाल मृदभांड) - ताम्रपाषाण काल<br/>
                  • OCP / BRW / PGW (चित्रित धूसर मृदभांड) - हड़प्पा सभ्यता<br/>
                  • PGW / NBPW (उत्तरी काले पॉलिशदार मृदभांड) - लौह युग
                </>}
              />
            </div>
          ),
          tags: ["Ancient", "Ages"]
        },
        {
          id: "delhi-sultanate",
          title: "Delhi Sultanate",
          titleHi: "दिल्ली सल्तनत",
          content: (
            <div className="space-y-4">
              <BiBox 
                className="p-3.5 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-sm text-emerald-200 mb-3"
                en={<>
                  <strong>Dynasty ruled over Delhi (Mamluk dynasty / Ilbari tribe):</strong><br/>
                  • <strong>Sa</strong> - Slave Dynasty [1206-1290]<br/>
                  • <strong>K</strong> - Khilji Dynasty [1290-1320]<br/>
                  • <strong>T</strong> - Tughlaq dynasty [1320-1414]<br/>
                  • <strong>Sa</strong> - Sayyid dynasty [1415-1451]<br/>
                  • <strong>Lo</strong> - Lodhi dynasty [1451-1526]
                </>}
                hi={<>
                  <strong>दिल्ली पर शासन करने वाले वंश (क्रम):</strong><br/>
                  • <strong>गु</strong> - गुलाम वंश [1206-1290]<br/>
                  • <strong>खि</strong> - खिलजी वंश [1290-1320]<br/>
                  • <strong>तु</strong> - तुगलक वंश [1320-1414]<br/>
                  • <strong>सै</strong> - सैयद वंश [1415-1451]<br/>
                  • <strong>लो</strong> - लोदी वंश [1451-1526]
                </>}
              />

              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>Slave Dynasty [1206-1290]</strong>: Founder - <strong>Qutubuddin Aibak</strong> [1206-10]. Died while playing Chaugan.</>}
                  hi={<><strong>गुलाम वंश [1206-1290]</strong>: संस्थापक - <strong>कुतुबुद्दीन ऐबक</strong> [1206-10]। चौगान (पोलो) खेलते समय मृत्यु हुई।</>}
                />
                <BiLi 
                  en={<><strong>Iltutmish [1210-1236]</strong>: Introduced Tanka (silver coin) and Jital (copper coin). Introduced Iqta system (piece of land). Chronicler: <em>Minhaj-e-Siraj</em> (wrote Tabakat-e-Nasiri, also known as Tawarikh).</>}
                  hi={<><strong>इल्तुतमिश [1210-1236]</strong>: टंका (चांदी का सिक्का) और जीतल (तांबे का सिक्का) चलाया। इक्ता प्रणाली शुरू की। इतिहासकार: <em>मिन्हाज-ए-सिराज</em> (तबकात-ए-नासिरी के लेखक)।</>}
                />
                <BiLi 
                  en={<><strong>Razia Sultan [1236-1240]</strong>: Daughter of Iltutmish. First and only Muslim Lady ruler of India. Altunia imprisoned Razia (in Qila Mubarak of Bhatinda), later they got married. Assassinated near Kaithal (Haryana) by Khokhar tribe.</>}
                  hi={<><strong>रजिया सुल्तान [1236-1240]</strong>: इल्तुतमिश की पुत्री। भारत की पहली और एकमात्र मुस्लिम महिला शासक। अल्तूनिया ने रजिया को भटिंडा के किला मुबारक में कैद किया, बाद में दोनों का विवाह हुआ। कैथल में हत्या हुई।</>}
                />
                <BiLi 
                  en={<><strong>Balban [1266-1287]</strong>: Abolished Chalisa &amp; made King Supreme. Introduced: Sijda (Prostration before Monarch) &amp; Paibos (kissing the feet of Monarch).</>}
                  hi={<><strong>बलबन [1266-1287]</strong>: चालीसा दल को समाप्त किया और सुल्तान को सर्वोच्च बनाया। सिजदा (दंडवत प्रणाम) और पैबोस (चरण चूमना) की प्रथा शुरू की।</>}
                />
                <BiLi 
                  en={<><strong>Lodhi Dynasty [1451-1526]</strong>: Introduced double dome architecture (Eg Moth ki Masjid). Sikandar Lodhi [in 1504] founded Agra city. Pen name - <em>Gulrukhi</em>.</>}
                  hi={<><strong>लोदी वंश [1451-1526]</strong>: दोहरे गुंबद वास्तुकला की शुरुआत (उदा. मोठ की मस्जिद)। सिकंदर लोदी ने [1504 में] आगरा शहर की स्थापना की। उपनाम - <em>गुलरूखी</em>।</>}
                />
              </ul>
            </div>
          ),
          tags: ["Medieval", "Rulers"]
        }
      ]
    },

    /* ====================================================================
       4. SCIENCE
    ==================================================================== */
    {
      id: "science",
      title: "Science",
      titleHi: "विज्ञान",
      iconName: "FlaskConical",
      description: "Biology and Physics fundamentals",
      descriptionHi: "जीव विज्ञान और भौतिकी के मूल सिद्धांत",
      leaves: [
        {
          id: "cellular",
          title: "Cellular Transport & Tonicity",
          titleHi: "कोशिकीय परिवहन और टोनिसिटी",
          content: (
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>Diffusion</strong>: movement from higher to lower concentration.</>}
                  hi={<><strong>विसरण (Diffusion)</strong>: उच्च सांद्रता से निम्न सांद्रता की ओर अणुओं की गति।</>}
                />
                <BiLi 
                  en={<><strong>Osmosis</strong>: movement of water from high concentration to low concentration through a semipermeable membrane.</>}
                  hi={<><strong>परासरण (Osmosis)</strong>: अर्धपारगम्य झिल्ली के माध्यम से उच्च सांद्रता से निम्न सांद्रता की ओर जल की गति।</>}
                />
                <BiLi 
                  en={<><strong>Active transport</strong>: needs energy for movement.</>}
                  hi={<><strong>सक्रिय परिवहन (Active Transport)</strong>: गति के लिए ऊर्जा (ATP) की आवश्यकता होती है।</>}
                />
              </ul>
            </div>
          ),
          tags: ["Biology"],
          customVisual: <TonicitySVG />
        },
        {
          id: "states-matter",
          title: "States of Matter",
          titleHi: "पदार्थ की अवस्थाएँ",
          content: (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img src="/State Of matter_.png" alt="States of Matter" className="w-full h-auto object-cover bg-slate-900" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('div.error-msg')) {
                      const div = document.createElement('div');
                      div.className = 'error-msg p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2';
                      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>State Of matter_.png</b></span>';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>1. Solid</strong>: Rigid, fixed shape, fixed volume, max intermolecular forces of attraction, least kinetic energy.</>}
                  hi={<><strong>1. ठोस (Solid)</strong>: दृढ़, निश्चित आकार, निश्चित आयतन, अधिकतम अंतर-आणविक आकर्षण बल, न्यूनतम गतिज ऊर्जा।</>}
                />
                <BiLi 
                  en={<><strong>2. Liquid</strong>: Not rigid, no fixed shape, fixed volume.</>}
                  hi={<><strong>2. द्रव (Liquid)</strong>: दृढ़ नहीं, कोई निश्चित आकार नहीं, निश्चित आयतन।</>}
                />
                <BiLi 
                  en={<><strong>3. Gas</strong>: Not rigid, no fixed shape, no fixed volume, exhibits behaviour uniformity, lowest intermolecular forces of attraction.</>}
                  hi={<><strong>3. गैस (Gas)</strong>: दृढ़ नहीं, कोई निश्चित आकार या आयतन नहीं, एकसमान व्यवहार, न्यूनतम अंतर-आणविक आकर्षण बल।</>}
                />
                <BiLi 
                  en={<><strong>4. Plasma</strong>: Gas is heated at high temperature, it ionises &amp; glows.</>}
                  hi={<><strong>4. प्लाज्मा (Plasma)</strong>: उच्च तापमान पर गैस गर्म होती है, आयनित होती है और चमकती है।</>}
                />
                <BiLi 
                  en={<><strong>5. Bosons (Bose-Einstein Condensate)</strong>: Gas of low density - cooled down at 0 K / -273° C. First given by Satyendranath Bose [1924] &amp; Einstein [1925].</>}
                  hi={<><strong>5. बोसॉन (बोस-आइंस्टीन संघनन)</strong>: निम्न घनत्व की गैस - 0 K / -273° C पर अत्यधिक ठंडी की गई। सर्वप्रथम सत्येंद्रनाथ बोस [1924] और अल्बर्ट आइंस्टीन [1925] द्वारा प्रतिपादित।</>}
                />
              </ul>

              <BiBox 
                className="p-3.5 bg-blue-950/40 border border-blue-800/60 rounded-xl text-sm text-blue-200"
                en={<>
                  <strong>Nobel Prizes for Bosons:</strong><br/>
                  • 1955: Eric Cornell + Carl Weimann (Bosons from Rubidium gas) -&gt; Nobel Prize for physics in 2001<br/>
                  • 1999: Wolfgang Ketterle (Bosons from Sodium gas)
                </>}
                hi={<>
                  <strong>बोसॉन के लिए नोबेल पुरस्कार:</strong><br/>
                  • 1995: एरिक कॉर्नेल + कार्ल वीमैन (रूबिडियम गैस से बोसॉन) -&gt; 2001 में भौतिकी का नोबेल पुरस्कार<br/>
                  • 1999: वोल्फगैंग केटरले (सोडियम गैस से बोसॉन)
                </>}
              />
            </div>
          ),
          tags: ["Physics"]
        }
      ]
    },

    /* ====================================================================
       5. ECONOMICS
    ==================================================================== */
    {
      id: "economics",
      title: "Economics",
      titleHi: "अर्थशास्त्र",
      iconName: "TrendingUp",
      description: "Economic Sectors and Market Theories",
      descriptionHi: "आर्थिक क्षेत्र और बाज़ार सिद्धांत",
      leaves: [
        {
          id: "micro-macro",
          title: "Microeconomics & Macroeconomics",
          titleHi: "व्यष्टि और समष्टि अर्थशास्त्र",
          content: (
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>Microeconomics</strong> (Demand &amp; Supply): Father - Adam Smith / Alfred Marshall. Book - <em>Wealth of Nations</em>.</>}
                  hi={<><strong>व्यष्टि अर्थशास्त्र (Microeconomics)</strong> (मांग और आपूर्ति): जनक - एडम स्मिथ / अल्फ्रेड मार्शल। प्रसिद्ध पुस्तक - <em>वेल्थ ऑफ नेशंस</em>।</>}
                />
                <BiLi 
                  en={<><strong>Macroeconomics</strong> (National Income, Employment): Father - JM Keynes. Book - <em>General Theory of Employment</em>.</>}
                  hi={<><strong>समष्टि अर्थशास्त्र (Macroeconomics)</strong> (राष्ट्रीय आय, रोजगार): जनक - जे.एम. कीन्स। प्रसिद्ध पुस्तक - <em>जनरल थ्योरी ऑफ एम्प्लॉयमेंट</em>।</>}
                />
              </ul>
            </div>
          ),
          tags: ["Theory"]
        },
        {
          id: "collar-jobs",
          title: "Collar Jobs & Sector Types",
          titleHi: "कॉलर जॉब्स और आर्थिक क्षेत्र",
          content: (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img src="/Collar Jobs.png" alt="Collar Jobs & Sector Types" className="w-full h-auto object-cover bg-slate-900" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('div.error-msg')) {
                      const div = document.createElement('div');
                      div.className = 'error-msg p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2';
                      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>Collar Jobs.png</b></span>';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>Primary sector (Red Collar Jobs)</strong>: LFPR - 54.6%, GDP - 14.39%. Includes: Agriculture, Forestry, Animal Husbandry, Fishing, Poultry Farming, Mining, Quarrying.</>}
                  hi={<><strong>प्राथमिक क्षेत्र (रेड कॉलर जॉब्स)</strong>: LFPR - 54.6%, GDP - 14.39%। शामिल हैं: कृषि, वानिकी, पशुपालन, मत्स्य पालन, कुक्कुट पालन, खनन, उत्खनन।</>}
                />
                <BiLi 
                  en={<><strong>Secondary sector (Blue collar jobs)</strong>: LFPR - 24.3%, GDP - 31.46%. Includes: Manufacturing &amp; Industrial Production.</>}
                  hi={<><strong>द्वितीयक क्षेत्र (ब्लू कॉलर जॉब्स)</strong>: LFPR - 24.3%, GDP - 31.46%। शामिल हैं: विनिर्माण और औद्योगिक उत्पादन।</>}
                />
                <BiLi 
                  en={<><strong>Tertiary sector (White collar jobs)</strong>: LFPR - 21.1%, GDP - 54%. Includes: Trade, Transport, Communication, Banking, Education, Health, Services.</>}
                  hi={<><strong>तृतीयक क्षेत्र (व्हाइट कॉलर जॉब्स)</strong>: LFPR - 21.1%, GDP - 54%। शामिल हैं: व्यापार, परिवहन, संचार, बैंकिंग, शिक्षा, स्वास्थ्य और सेवा क्षेत्र।</>}
                />
              </ul>
            </div>
          ),
          tags: ["Employment", "Statistics"]
        }
      ]
    },

    /* ====================================================================
       6. ART & CULTURE
    ==================================================================== */
    {
      id: "culture",
      title: "Art & Culture",
      titleHi: "कला और संस्कृति",
      iconName: "Palette",
      description: "Classical Dances, Folk Dances and Festivals",
      descriptionHi: "शास्त्रीय नृत्य, लोक नृत्य और त्यौहार",
      leaves: [
        {
          id: "classical-dances",
          title: "Classical Dances",
          titleHi: "शास्त्रीय नृत्य",
          content: (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img src="/Classical dance_.png" alt="Classical Dances" className="w-full h-auto object-cover bg-slate-900" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('div.error-msg')) {
                      const div = document.createElement('div');
                      div.className = 'error-msg p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2';
                      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>Classical dance_.png</b></span>';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>8 recognized by Sangeet Natak Academy</strong> (9 by Ministry of Culture with Chhau).</>}
                  hi={<><strong>संगीत नाटक अकादमी द्वारा 8 मान्यता प्राप्त</strong> (संस्कृति मंत्रालय द्वारा छऊ सहित 9)।</>}
                />
                <BiLi 
                  en={<><strong>Bharatnatyam</strong> -&gt; Tamil Nadu</>}
                  hi={<><strong>भरतनाट्यम</strong> -&gt; तमिलनाडु</>}
                />
                <BiLi 
                  en={<><strong>Odissi</strong> -&gt; Odisha</>}
                  hi={<><strong>ओडिसी</strong> -&gt; ओडिशा</>}
                />
                <BiLi 
                  en={<><strong>Manipuri</strong> -&gt; Manipur</>}
                  hi={<><strong>मणिपुरी</strong> -&gt; मणिपुर</>}
                />
                <BiLi 
                  en={<><strong>Kathak</strong> -&gt; Uttar Pradesh</>}
                  hi={<><strong>कथक</strong> -&gt; उत्तर प्रदेश</>}
                />
                <BiLi 
                  en={<><strong>Kathakali</strong> -&gt; Kerala</>}
                  hi={<><strong>कथकली</strong> -&gt; केरल</>}
                />
                <BiLi 
                  en={<><strong>Mohiniattam</strong> -&gt; Kerala</>}
                  hi={<><strong>मोहिनीअट्टम</strong> -&gt; केरल</>}
                />
                <BiLi 
                  en={<><strong>Kuchipudi</strong> -&gt; Andhra Pradesh</>}
                  hi={<><strong>कुचिपुड़ी</strong> -&gt; आंध्र प्रदेश</>}
                />
                <BiLi 
                  en={<><strong>Sattriya</strong> -&gt; Assam [2000] (By Srimanta Sankardev) - Father: Guru Sukhdev</>}
                  hi={<><strong>सत्रिया</strong> -&gt; असम [वर्ष 2000 में मान्यता] (श्रीमंत शंकरदेव द्वारा) - जनक: गुरु सुखदेव</>}
                />
              </ul>
              
              <BiBox 
                className="p-3.5 bg-blue-950/40 border border-blue-800/60 rounded-xl text-sm text-blue-200"
                en={<><strong>Vyavharmala</strong> - written by Mazhamanglam Narayan Namboodiri</>}
                hi={<><strong>व्यवहारमाला</strong> - मळमंगलम नारायण नंबूदिरी द्वारा रचित</>}
              />
            </div>
          ),
          tags: ["Dance"]
        },
        {
          id: "kathakali-makeup",
          title: "The Types of Kathakali Vesham (Makeup)",
          titleHi: "कथकली वेषम (मेकअप) के प्रकार",
          content: (
            <div className="flex flex-col gap-6 mt-2">
              <p className="text-slate-700">
                <Bi 
                  en="Kathakali is distinguished by its highly stylized makeup and costumes (Vesham) which immediately identify a character's nature."
                  hi="कथकली को इसके अत्यधिक शैलीबद्ध श्रृंगार और वेशभूषा (वेषम) द्वारा पहचाना जाता है जो पात्र की प्रकृति को तुरंत स्पष्ट करते हैं।"
                />
              </p>
              <div className="w-full rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img 
                  src="/Types of Kathakali Vesham  (Makeup).png" 
                  alt="Types of Kathakali Vesham (Makeup)" 
                  className="w-full h-auto object-cover bg-slate-900"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      const div = document.createElement('div');
                      div.className = 'p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2';
                      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>Types of Kathakali Vesham  (Makeup).png</b></span>';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pacha */}
                <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/50 shadow-sm">
                  <h4 className="font-bold text-lg text-emerald-300">
                    <Bi en="1. Pacha (Green)" hi="1. पच्चा (हरा)" />
                  </h4>
                  <p className="text-slate-200 mt-2 text-sm">
                    <Bi 
                      en="Represents noble, heroic, and divine characters like Krishna or Arjuna. Features a brilliant green face with dramatic black eye designs and a chutti (white border)."
                      hi="कृष्ण या अर्जुन जैसे कुलीन, वीर और दिव्य पात्रों का प्रतिनिधित्व करता है। चेहरे पर चमकीला हरा रंग और सफेद चुट्टी बॉर्डर होता है।"
                    />
                  </p>
                </div>

                {/* Kathi */}
                <div className="p-4 bg-rose-950/40 rounded-xl border border-rose-800/50 shadow-sm">
                  <h4 className="font-bold text-lg text-rose-300">
                    <Bi en="2. Kathi (Knife)" hi="2. कत्ति (चाकू)" />
                  </h4>
                  <p className="text-slate-200 mt-2 text-sm">
                    <Bi 
                      en="Represents characters who are arrogant, evil, but of high birth (like Ravana). Features a green base with an upturned red mustache pattern and a white knob on the nose."
                      hi="घमंडी, दुष्ट लेकिन उच्च कुलीन पात्रों (जैसे रावण) का प्रतिनिधित्व करता है। हरे आधार पर लाल मूंछ का पैटर्न और नाक पर सफेद घुंडी होती है।"
                    />
                  </p>
                </div>

                {/* Thadi */}
                <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/50 shadow-sm">
                  <h4 className="font-bold text-lg text-amber-300">
                    <Bi en="3. Thadi (Beard)" hi="3. ताड़ी (दाढ़ी)" />
                  </h4>
                  <p className="text-slate-200 mt-2 text-sm">
                    <Bi 
                      en="Represents destructive, evil, or superhuman characters. 'Chuvanna Thadi' (Red Beard) is for extremely evil figures with fierce face paint."
                      hi="विनाशकारी, दुष्ट या अलौकिक पात्रों को दर्शाता है। 'चुवन्ना ताड़ी' (लाल दाढ़ी) अत्यंत क्रूर और दुष्ट चरित्रों के लिए होती है।"
                    />
                  </p>
                </div>

                {/* Kari */}
                <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 shadow-sm">
                  <h4 className="font-bold text-lg text-slate-200">
                    <Bi en="4. Kari (Black)" hi="4. करि (काला)" />
                  </h4>
                  <p className="text-slate-300 mt-2 text-sm">
                    <Bi 
                      en="Represents demonesses or extremely evil female characters (like Surpanakha). Features a stark black painted face decorated with intricate white patterns."
                      hi="राक्षसियों या अत्यंत दुष्ट महिला पात्रों (जैसे शूर्पणखा) का प्रतिनिधित्व करता है। पूरी तरह से काला रंग और सफेद सजावट होती है।"
                    />
                  </p>
                </div>

                {/* Minnuku */}
                <div className="p-4 bg-yellow-950/40 rounded-xl border border-yellow-800/50 shadow-sm">
                  <h4 className="font-bold text-lg text-yellow-300">
                    <Bi en="5. Minukku (Radiance)" hi="5. मिनुक्कु (तेजस्वी)" />
                  </h4>
                  <p className="text-slate-200 mt-2 text-sm">
                    <Bi 
                      en="Represents gentle female characters, heroines, or sages. Features a simple, warm yellow-orange face paint without the dramatic white chutti border."
                      hi="सौम्य स्त्री पात्रों, नायिकाओं या ऋषियों-मुनियों का प्रतिनिधित्व करता है। साधारण गर्म पीले-नारंगी रंग का मेकअप होता है।"
                    />
                  </p>
                </div>

                {/* Pazhuppu */}
                <div className="p-4 bg-red-950/40 rounded-xl border border-red-800/50 shadow-sm">
                  <h4 className="font-bold text-lg text-red-300">
                    <Bi en="6. Pazhuppu (Ripe)" hi="6. पळुप्पु (पका हुआ)" />
                  </h4>
                  <p className="text-slate-200 mt-2 text-sm">
                    <Bi 
                      en="A distinct sub-category representing revered deities like Shiva and Balarama with unique reddish-orange face base."
                      hi="शिव और बलराम जैसे पूज्य देवताओं का प्रतिनिधित्व करने वाली विशेष श्रेणी। इसमें विशिष्ट लाल-नारंगी रंग का आधार होता है।"
                    />
                  </p>
                </div>
              </div>
            </div>
          ),
          tags: ["Dance", "Visual Guide"]
        },
        {
          id: "folk-dances",
          title: "Folk Dances",
          titleHi: "लोक नृत्य",
          content: (
            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img src="/Folk Dance Trick.png" alt="Folk Dances Trick" className="w-full h-auto object-cover bg-slate-900" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('div.error-msg')) {
                      const div = document.createElement('div');
                      div.className = 'error-msg p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2';
                      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>Folk Dance Trick.png</b></span>';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>

              {/* Maharashtra */}
              <div>
                <h4 className="font-bold text-slate-100 mb-2">
                  <Bi en="Maharashtra" hi="महाराष्ट्र" />
                </h4>
                <BiBox 
                  className="p-3.5 bg-purple-950/40 border border-purple-800/60 rounded-xl text-sm text-purple-200 mb-3"
                  en={<><strong>Trick:</strong> E <strong>KOHLI VADAPAV LANA</strong>, <strong>Lazy</strong> Kahin ki <strong>Tamasha</strong> Kar Rahi hai, <strong>Dafa</strong> Hoja Varna Main <strong>Mouni</strong> Jo <strong>Dhangka Natak</strong> Karti Hai Uske Pas Chala Jaunga</>}
                  hi={<><strong>याद रखने की ट्रिक:</strong> ए <strong>कोहली वड़ापाव लाना</strong>, <strong>लेज़ी</strong> कहीं की <strong>तमाशा</strong> कर रही है, <strong>दफा</strong> हो जा वरना मैं <strong>मौनी</strong> जो <strong>ढंग का नाटक</strong> करती है उसके पास चला जाऊंगा</>}
                />
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <BiLi en={<>Kohli - Koli dance</>} hi={<>कोहली - कोली नृत्य</>} />
                  <BiLi en={<>Vadapav - Pavdas dance</>} hi={<>वड़ापाव - पोवाड़ा नृत्य</>} />
                  <BiLi en={<>Lana - Lavani dance</>} hi={<>लाना - लावणी नृत्य</>} />
                  <BiLi en={<>Lazy - Lezim dance</>} hi={<>लेज़ी - लेझिम नृत्य</>} />
                  <BiLi en={<>Tamasha - Tamasha dance</>} hi={<>तमाशा - तमाशा नृत्य</>} />
                  <BiLi en={<>Dafa - Dahikala / Gafa</>} hi={<>दफा - दहीकला / गाफा</>} />
                  <BiLi en={<>Mouni - Mouni dance</>} hi={<>मौनी - मौनी नृत्य</>} />
                  <BiLi en={<>Dhangka - Dhangari Gaja</>} hi={<>ढंगका - धनगरी गजा</>} />
                  <BiLi en={<>Natak - Natak</>} hi={<>नाटक - नाटक</>} />
                </ul>
              </div>

              {/* Karnataka */}
              <div>
                <h4 className="font-bold text-slate-100 mb-2">
                  <Bi en="Karnataka" hi="कर्नाटक" />
                </h4>
                <BiBox 
                  className="p-3.5 bg-purple-950/40 border border-purple-800/60 rounded-xl text-sm text-purple-200 mb-3"
                  en={<><strong>Trick:</strong> <strong>Yash</strong> Bola <strong>Kam</strong> kar Saale <strong>Doll Bhootha Nagamandali Veerta</strong> Khatam Karegi</>}
                  hi={<><strong>याद रखने की ट्रिक:</strong> <strong>यश</strong> बोला <strong>कम</strong> कर साले <strong>डॉल भूत नागमंडली वीरता</strong> खत्म करेगी</>}
                />
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <BiLi en={<>Yash - Yakshagana</>} hi={<>यश - यक्षगान</>} />
                  <BiLi en={<>Veerta - Veeragase</>} hi={<>वीरता - वीरगासे</>} />
                  <BiLi en={<>Doll - Dollu Kunitha</>} hi={<>डॉल - डोलू कुनिथा</>} />
                  <BiLi en={<>Bhootha - Bhootha Aradhane</>} hi={<>भूत - भूत आराधना</>} />
                  <BiLi en={<>Kam - Kamsale</>} hi={<>कम - कमसाले</>} />
                  <BiLi en={<>Bola - Bolak-aat</>} hi={<>बोला - बोलाक-आत</>} />
                  <BiLi en={<>Nagamandali - Nagamandala</>} hi={<>नागमंडली - नागमंडल</>} />
                </ul>
              </div>

              {/* Gujarat */}
              <div>
                <h4 className="font-bold text-slate-100 mb-2">
                  <Bi en="Gujarat" hi="गुजरात" />
                </h4>
                <BiBox 
                  className="p-3.5 bg-purple-950/40 border border-purple-800/60 rounded-xl text-sm text-purple-200 mb-3"
                  en={<><strong>Trick:</strong> Gujarat ki <strong>Gopiyan Dandiya</strong> Khelne <strong>Siddiyon</strong> se Matak k <strong>Padhar</strong> rahi hain</>}
                  hi={<><strong>याद रखने की ट्रिक:</strong> गुजरात की <strong>गोपियां डांडिया</strong> खेलने <strong>सीढ़ियों</strong> से मटक के <strong>पधार</strong> रही हैं</>}
                />
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <BiLi en={<>Garba - Garba</>} hi={<>गरबा - गरबा नृत्य</>} />
                  <BiLi en={<>Gopiyan - Gop Raas</>} hi={<>गोपियां - गोप रास</>} />
                  <BiLi en={<>Dandiya - Dandiya (mock fight b/w Maa Durga &amp; Mahishasur)</>} hi={<>डांडिया - डांडिया (माँ दुर्गा और महिषासुर का प्रतीकात्मक युद्ध)</>} />
                  <BiLi en={<>Siddiyon - Siddi Dhamal</>} hi={<>सीढ़ियों - सिद्दी धमाल</>} />
                  <BiLi en={<>Padhar - Padhar dance</>} hi={<>पधार - पधार नृत्य</>} />
                  <BiLi en={<>Others: Tippani, Hudo, Bhavai, Vinchhudo</>} hi={<>अन्य: टिप्पणी, हुडो, भवाई, विंछुड़ो</>} />
                </ul>
              </div>
            </div>
          ),
          tags: ["Folk", "Tricks"]
        },
        {
          id: "festivals",
          title: "Important Festivals",
          titleHi: "प्रमुख त्यौहार",
          content: (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img src="/Important Festival_.png" alt="Important Festivals" className="w-full h-auto object-cover bg-slate-900" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent && !parent.querySelector('div.error-msg')) {
                      const div = document.createElement('div');
                      div.className = 'error-msg p-6 text-center text-slate-500 bg-slate-50 flex flex-col items-center gap-2';
                      div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg><span>Please upload <b>Important Festival_.png</b></span>';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>Odisha</strong>: Nuakhai, Chhau, Kalinga, Raja Parba, Rath Yatra, Konark, Baliyatra.</>}
                  hi={<><strong>ओडिशा</strong>: नुआखाई, छऊ, कलिंग महोत्सव, राजा परबा, रथ यात्रा, कोणार्क, बालियात्रा।</>}
                />
                <BiLi 
                  en={<><strong>Assam</strong>: Bihu, Baikho/ Baishagu, Dihing Patkai, Ali-Aye-Ligang, Ambubachi Mela [Kamakhya Devi temple], Majuli festival, Rongker festival [Karbi tribe].</>}
                  hi={<><strong>असम</strong>: बिहू, बैखो/बैशागु, दिहिंग पटकाई, अली-ऐ-लिगांग, अम्बुबाची मेला [कामाख्या देवी मंदिर], माजुली महोत्सव, रोंगकर उत्सव [कार्बी जनजाति]।</>}
                />
                <BiLi 
                  en={<><strong>Nagaland</strong>: Hornbill festival [Naga tribe], Mim Kut [Kuki tribe], Aoleang, Moatsu [Ao tribe].</>}
                  hi={<><strong>नागालैंड</strong>: हॉर्नबिल महोत्सव [नागा जनजाति], मिम कुट [कुकी जनजाति], ओलांग, मोआत्सु [आओ जनजाति]।</>}
                />
                <BiLi 
                  en={<><strong>Bihar</strong>: Chhath Puja, Sonepur Cattle Fair, Sama Chakeva.</>}
                  hi={<><strong>बिहार</strong>: छठ पूजा, सोनपुर पशु मेला, सामा चकेवा।</>}
                />
              </ul>
            </div>
          ),
          tags: ["Festivals"]
        }
      ]
    },

    /* ====================================================================
       7. MISCELLANEOUS
    ==================================================================== */
    {
      id: "misc",
      title: "Miscellaneous",
      titleHi: "विविध",
      iconName: "Library",
      description: "Sports, Literature, and Government Schemes",
      descriptionHi: "खेल, साहित्य और सरकारी योजनाएँ",
      leaves: [
        {
          id: "badminton",
          title: "Badminton",
          titleHi: "बैडमिंटन",
          content: (
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <BiLi en={<><strong>Other name</strong>: Poona</>} hi={<><strong>अन्य नाम</strong>: पूना (Poona)</>} />
                <BiLi en={<><strong>Love</strong>: 0-0 score</>} hi={<><strong>लव (Love)</strong>: 0-0 स्कोर</>} />
                <BiLi en={<><strong>Deuce</strong>: tied/same score at 20-20</>} hi={<><strong>ड्यूस (Deuce)</strong>: 20-20 पर बराबरी का स्कोर</>} />
                <BiLi en={<><strong>Court dimensions</strong>: Length = 13.4m, Width = 6.1m</>} hi={<><strong>कोर्ट का आकार</strong>: लंबाई = 13.4 मीटर, चौड़ाई = 6.1 मीटर</>} />
                <BiLi en={<><strong>Net height</strong>: 5 ft (1.524m at center)</>} hi={<><strong>नेट की ऊंचाई</strong>: 5 फीट (केंद्र में 1.524 मीटर)</>} />
              </ul>

              <BiBox 
                className="p-3.5 bg-rose-950/40 border border-rose-800/60 rounded-xl text-sm text-rose-200"
                en={<>
                  <strong>3 Cards in Badminton:</strong><br/>
                  • <strong>Yellow</strong> - warning for misconduct<br/>
                  • <strong>Red</strong> - fault for serious misconduct (point awarded to opponent)<br/>
                  • <strong>Black</strong> - disqualification / removal from match
                </>}
                hi={<>
                  <strong>बैडमिंटन में 3 कार्ड:</strong><br/>
                  • <strong>पीला कार्ड</strong> - दुर्व्यवहार के लिए चेतावनी<br/>
                  • <strong>लाल कार्ड</strong> - गंभीर गलती (विपक्षी को अंक मिलता है)<br/>
                  • <strong>काला कार्ड</strong> - मैच से अयोग्यता / निष्कासन
                </>}
              />

              <BiBox 
                className="p-3.5 bg-blue-950/40 border border-blue-800/60 rounded-xl text-sm text-blue-200"
                en={<>
                  <strong>Badminton Cups &amp; Trophies:</strong><br/>
                  Thomas Cup (Men), Uber Cup (Women), Syed Modi Trophy, Narang Cup, Yonex Cup, Maharaja Ranjit Singh Cup
                </>}
                hi={<>
                  <strong>बैडमिंटन कप और ट्रॉफियां:</strong><br/>
                  थॉमस कप (पुरुष), उबेर कप (महिला), सैयद मोदी ट्रॉफी, नारंग कप, योनेक्स कप, महाराजा रणजीत सिंह कप
                </>}
              />
            </div>
          ),
          tags: ["Sports"]
        },
        {
          id: "literature",
          title: "Literature & Authors",
          titleHi: "साहित्य और लेखक",
          content: (
            <div className="space-y-4">
              <p className="text-slate-200">
                <Bi 
                  en={<>
                    Important authors and their master works for competitive exams. 
                    For example, <strong>Jaishankar Prasad</strong> wrote classic literary masterpieces:
                  </>}
                  hi={<>
                    प्रतियोगी परीक्षाओं के लिए प्रमुख लेखक और उनकी कालजयी रचनाएँ।
                    उदाहरण के लिए, <strong>जयशंकर प्रसाद</strong> ने कालजयी कृतियाँ लिखीं:
                  </>}
                />
              </p>
              <BiBox 
                className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl text-amber-200"
                en={<>
                  <strong className="text-amber-300">Major Works of Jaishankar Prasad:</strong><br/>
                  • <em>Kamayani</em> (कामायनी) - Epic poetry<br/>
                  • <em>Dhruvswamini</em> (ध्रुवस्वामिनी)<br/>
                  • <em>Kankal</em> (कंकाल)<br/>
                  • <em>Titli</em> (तितली)<br/>
                  • <em>Skandagupta</em> (स्कंदगुप्त)<br/>
                  • <em>Lahar</em> (लहर)<br/>
                  • <em>Mamta</em> (ममता)
                </>}
                hi={<>
                  <strong className="text-amber-300">जयशंकर प्रसाद की प्रमुख रचनाएँ:</strong><br/>
                  • <em>कामायनी</em> (महाकाव्य)<br/>
                  • <em>ध्रुवस्वामिनी</em> (नाटक)<br/>
                  • <em>कंकाल</em> (उपन्यास)<br/>
                  • <em>तितली</em> (उपन्यास)<br/>
                  • <em>स्कंदगुप्त</em> (नाटक)<br/>
                  • <em>लहर</em> (काव्य संग्रह)<br/>
                  • <em>ममता</em> (कहानी)
                </>}
              />
            </div>
          ),
          tags: ["Books"]
        },
        {
          id: "schemes",
          title: "Government Schemes",
          titleHi: "प्रमुख सरकारी योजनाएँ",
          content: (
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <BiLi 
                  en={<><strong>PM Fasal Bima Yojana</strong> - Launched in 2016 (Crop insurance against natural calamities).</>}
                  hi={<><strong>प्रधानमंत्री फसल बीमा योजना</strong> - 2016 में प्रारंभ (प्राकृतिक आपदाओं के विरुद्ध फसल सुरक्षा)।</>}
                />
                <BiLi 
                  en={<><strong>PM Rozgar Protsahan Yojana</strong> - Launched in 2016 (Incentivising employers for new employment).</>}
                  hi={<><strong>प्रधानमंत्री रोजगार प्रोत्साहन योजना</strong> - 2016 में प्रारंभ (नए रोजगार सृजन को प्रोत्साहन)।</>}
                />
                <BiLi 
                  en={<><strong>Garib Kalyan Rojgar Abhiyaan</strong> - Launched in 2020 (125 days employment in 6 states for returnee migrant workers).</>}
                  hi={<><strong>गरीब कल्याण रोजगार अभियान</strong> - 2020 में प्रारंभ (प्रवासी श्रमिकों के लिए 6 राज्यों में 125 दिनों का रोजगार)।</>}
                />
                <BiLi 
                  en={<><strong>PM Surya Ghar Muft Bijli Yojana</strong> - Launched in 2024 (Up to 300 units free solar electricity).</>}
                  hi={<><strong>प्रधानमंत्री सूर्य घर मुफ्त बिजली योजना</strong> - 2024 में प्रारंभ (300 यूनिट तक मुफ्त सौर बिजली)।</>}
                />
              </ul>
            </div>
          ),
          tags: ["Govt"]
        }
      ]
    },

    /* ====================================================================
       8. PRACTICE QUESTIONS (SSC PYQS)
    ==================================================================== */
    {
      id: "practice-questions",
      title: "Practice Questions",
      titleHi: "अभ्यास प्रश्न",
      iconName: "FileQuestion",
      description: "SSC Previous Year Questions",
      descriptionHi: "एसएससी पिछले वर्ष के प्रश्न (SSC PYQs)",
      leaves: [
        {
          id: "q-polity",
          title: "Polity Questions",
          titleHi: "राजव्यवस्था अभ्यास प्रश्न",
          content: (
            <div className="space-y-4">
              <SSCQuestion 
                exam="SSC CHSL 13/10/2020 (Afternoon)"
                examHi="एसएससी सीएचएसएल 13/10/2020 (दोपहर)"
                question="When was the first Constituent Assembly election held in India?"
                questionHi="भारत में पहली संविधान सभा का चुनाव कब आयोजित किया गया था?"
                options={["1947", "1946", "1949", "1948"]}
                optionsHi={["1947", "1946", "1949", "1948"]}
                correctAnswer={1}
              />
              <SSCQuestion 
                exam="SSC CGL 11/09/2024 (2nd Shift)"
                examHi="एसएससी सीजीएल 11/09/2024 (दूसरी पाली)"
                question="Who among the following personalities was the chief draftsman of the constituent assembly that drafted the document of the Constitution?"
                questionHi="निम्नलिखित में से कौन संविधान सभा के मुख्य प्रारूपकार (चीफ ड्राफ्ट्समैन) थे जिन्होंने संविधान का मसौदा तैयार किया?"
                options={["KM Munshi", "Vasant Krishan Vaidya", "SN Mukherjee", "HVR Iyenger"]}
                optionsHi={["के.एम. मुंशी", "वसंत कृष्ण वैद्य", "एस.एन. मुखर्जी", "एच.वी.आर. अयंगर"]}
                correctAnswer={2}
              />
              <SSCQuestion 
                exam="SSC CHSL 02/07/2024 (2nd shift)"
                examHi="एसएससी सीएचएसएल 02/07/2024 (दूसरी पाली)"
                question="Which of the following statements are correct in the context of the Indian Constitution? 1. There are three major organs of the government... 2. A separation of functions rather than powers is followed. 3. All organs of the government are independent."
                questionHi="भारतीय संविधान के संदर्भ में निम्नलिखित में से कौन से कथन सही हैं? 1. सरकार के तीन प्रमुख अंग हैं... 2. शक्तियों के पृथक्करण के बजाय कार्यों के पृथक्करण का पालन किया जाता है। 3. सरकार के सभी अंग स्वतंत्र हैं।"
                options={["1 and 3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"]}
                optionsHi={["केवल 1 और 3", "केवल 1 और 2", "केवल 2 और 3", "1, 2 और 3"]}
                correctAnswer={3}
              />
            </div>
          ),
          tags: ["Polity", "PYQ"]
        },
        {
          id: "q-geography",
          title: "Geography Questions",
          titleHi: "भूगोल अभ्यास प्रश्न",
          content: (
            <div className="space-y-4">
              <SSCQuestion 
                exam="SSC CHSL 08/07/2024 (1st shift)"
                examHi="एसएससी सीएचएसएल 08/07/2024 (प्रथम पाली)"
                question="Who was the first to develop a mathematical predictive heliocentric model of the solar system?"
                questionHi="सौर मंडल का गणितीय भविष्यसूचक सूर्यकेंद्रित (हेलियोसेंट्रिक) मॉडल सबसे पहले किसने विकसित किया था?"
                options={["Nicolaus Copernicus", "Galileo Galilei", "Pierre-Simon Laplace", "Immanuel Kant"]}
                optionsHi={["निकोलास कोपरनिकस", "गैलीलियो गैलीली", "पियरे-साइमन लाप्लास", "इमैनुएल कांट"]}
                correctAnswer={0}
                explanation="De revolutionibus orbium coelestium 1543"
                explanationHi="डी रिवोल्यूशनिबस ऑर्बियम सेलेस्टियम 1543"
              />
              <SSCQuestion 
                exam="SSC CHSL 05/07/2024 (1st shift)"
                examHi="एसएससी सीएचएसएल 05/07/2024 (प्रथम पाली)"
                question="Which of the following rocky planets is the fastest planet in our solar system - traveling through space at about 29 miles per second?"
                questionHi="हमारे सौर मंडल का सबसे तेज़ ग्रह कौन सा है जो लगभग 29 मील प्रति सेकंड की गति से अंतरिक्ष में यात्रा करता है?"
                options={["Earth", "Mercury", "Venus", "Mars"]}
                optionsHi={["पृथ्वी", "बुध", "शुक्र", "मंगल"]}
                correctAnswer={1}
                explanation="Mercury has an 88 Days Revolution"
                explanationHi="बुध का परिक्रमण काल मात्र 88 दिन है।"
              />
              <SSCQuestion 
                exam="SSC CHSL 21/03/2023 (1st Shift)"
                examHi="एसएससी सीएचएसएल 21/03/2023 (प्रथम पाली)"
                question="What is the zone between the arctic circle and north pole called?"
                questionHi="आर्कटिक वृत्त और उत्तरी ध्रुव के बीच के क्षेत्र को क्या कहा जाता है?"
                options={["Torrid zone", "Frigid zone", "North temperate zone", "South temperate zone"]}
                optionsHi={["उष्णकटिबंधीय क्षेत्र", "शीत कटिबंध (फ्रिगिड ज़ोन)", "उत्तरी समशीतोष्ण क्षेत्र", "दक्षिणी समशीतोष्ण क्षेत्र"]}
                correctAnswer={1}
              />
            </div>
          ),
          tags: ["Geography", "PYQ"]
        },
        {
          id: "q-history",
          title: "History Questions",
          titleHi: "इतिहास अभ्यास प्रश्न",
          content: (
            <div className="space-y-4">
              <SSCQuestion 
                exam="SSC GD 20/02/2025 (Evening)"
                examHi="एसएससी जीडी 20/02/2025 (शाम)"
                question="In which part of India did the earliest iron objects appear in the overlap between the Neolithic and Megalithic phases?"
                questionHi="भारत के किस भाग में नवपाषाण और महापाषाण काल के संक्रमण काल में लोहे की सबसे प्राचीन वस्तुएँ प्राप्त हुईं?"
                options={["South India", "South-West India", "North-East India", "North India"]}
                optionsHi={["दक्षिण भारत", "दक्षिण-पश्चिम भारत", "उत्तर-पूर्व भारत", "उत्तर भारत"]}
                correctAnswer={0}
              />
              <SSCQuestion 
                exam="SSC MTS 23/10/2024 (3rd Shift)"
                examHi="एसएससी एमटीएस 23/10/2024 (तीसरी पाली)"
                question="Which of the following statements is/are true about the Iron Age? 1. The establishment of large cities took place on the basis of sizeable surplus. 2. The ceramic associated with this age was Painted Grey Ware. 3. The Indus Valley Civilization flourished during the Iron Age."
                questionHi="लौह युग के बारे में कौन से कथन सत्य हैं? 1. बड़े शहरों की स्थापना पर्याप्त अधिशेष के आधार पर हुई। 2. इस युग से जुड़ा मृदभांड चित्रित धूसर मृदभांड (PGW) था। 3. सिंधु घाटी सभ्यता लौह युग के दौरान फली-फूली।"
                options={["Only 2 and 3", "Only 1 and 2", "All 1, 2 and 3", "Only 1"]}
                optionsHi={["केवल 2 और 3", "केवल 1 और 2", "1, 2 और 3 सभी", "केवल 1"]}
                correctAnswer={1}
                explanation="Indus Valley Civilization belongs to the Bronze Age, not Iron Age."
                explanationHi="सिंधु घाटी सभ्यता कांस्य युग की है, लौह युग की नहीं।"
              />
              <SSCQuestion 
                exam="Higher Secondary 25/06/2024 (Shift - 2)"
                examHi="हायर सेकेंडरी 25/06/2024 (पाली - 2)"
                question="In reference to the Delhi Sultanate, what was the 'Group of Forty' (Turkan-i-Chahalgani)?"
                questionHi="दिल्ली सल्तनत के संदर्भ में 'चालीसा दल' (तुर्कान-ए-चहलगानी) क्या था?"
                options={[
                  "They were powerful Turkish slave officers of Iltutmish",
                  "They were forty military archers",
                  "They were forty banjara traders",
                  "They were forty Rajput nobles"
                ]}
                optionsHi={[
                  "वे इल्तुतमिश के शक्तिशाली तुर्क गुलाम अधिकारी थे",
                  "वे चालीस सैन्य तीरंदाज थे",
                  "वे चालीस बंजारा व्यापारी थे",
                  "वे चालीस राजपूत कुलीन थे"
                ]}
                correctAnswer={0}
                explanation="Also known as Chalisa, organized by Iltutmish and abolished by Balban."
                explanationHi="इसे चालीसा भी कहा जाता था, जिसे इल्तुतमिश ने गठित किया और बलबन ने समाप्त किया।"
              />
              <SSCQuestion 
                exam="Higher Secondary 20/06/2024 (Shift - 2)"
                examHi="हायर सेकेंडरी 20/06/2024 (पाली - 2)"
                question="Which of the following dynasties of Delhi Sultanate founded Agra city?"
                questionHi="दिल्ली सल्तनत के निम्नलिखित में से किस राजवंश ने आगरा शहर की स्थापना की थी?"
                options={["Lodi dynasty", "Khalji dynasty", "Sayyid dynasty", "Tughluq dynasty"]}
                optionsHi={["लोदी वंश", "खिलजी वंश", "सैयद वंश", "तुगलक वंश"]}
                correctAnswer={0}
                explanation="Sikandar Lodi founded Agra in 1504."
                explanationHi="सिकंदर लोदी ने 1504 में आगरा की स्थापना की थी।"
              />
            </div>
          ),
          tags: ["History", "PYQ"]
        },
        {
          id: "q-science",
          title: "Science Questions",
          titleHi: "विज्ञान अभ्यास प्रश्न",
          content: (
            <div className="space-y-4">
              <SSCQuestion 
                exam="SSC CPO 27/06/2024 (Evening)"
                examHi="एसएससी सीपीओ 27/06/2024 (शाम)"
                question="Which is an integral membrane protein that forms the tetramer and facilitates the diffusion of water and some small, unmodified solutes across cellular membranes?"
                questionHi="कौन सा अभिन्न झिल्ली प्रोटीन है जो टेट्रामर बनाता है और कोशिका झिल्ली के पार पानी के विसरण की सुविधा प्रदान करता है?"
                options={["Immunoglobulins", "Mucins", "Transferrin", "Aquaporins"]}
                optionsHi={["इम्युनोग्लोबुलिन", "म्यूसिन्स", "ट्रांसफेरिन", "एक्वापोरिन्स (Aquaporins)"]}
                correctAnswer={3}
              />
              <SSCQuestion 
                exam="SSC CPO 27/06/2024 (1st shift)"
                examHi="एसएससी सीपीओ 27/06/2024 (प्रथम पाली)"
                question="Which of the following processes depicts the direct conversion of solid into gas without turning into liquid?"
                questionHi="निम्नलिखित में से कौन सी प्रक्रिया ठोस के बिना द्रव में बदले सीधे गैस में बदलने को दर्शाती है?"
                options={["Condensation", "Evaporation", "Deposition", "Sublimation"]}
                optionsHi={["संघनन", "वाष्पीकरण", "निक्षेपण", "उदात्तीकरण / ऊर्ध्वपातन (Sublimation)"]}
                correctAnswer={3}
                explanation="Sublimation is transition from solid directly to gas (e.g. Camphor, dry ice)."
                explanationHi="ऊर्ध्वपातन ठोस से सीधे गैस में परिवर्तन है (जैसे कपूर, शुष्क बर्फ)।"
              />
            </div>
          ),
          tags: ["Science", "PYQ"]
        },
        {
          id: "q-eco",
          title: "Economics Questions",
          titleHi: "अर्थशास्त्र अभ्यास प्रश्न",
          content: (
            <div className="space-y-4">
              <SSCQuestion 
                exam="SSC CHSL 09/10/2020 (Morning)"
                examHi="एसएससी सीएचएसएल 09/10/2020 (सुबह)"
                question="________ is defined as the study of behaviour of individual decision-making units, such as consumers, resource owners and firms."
                questionHi="________ को व्यक्तिगत निर्णय लेने वाली इकाइयों, जैसे उपभोक्ताओं, संसाधन स्वामियों और फर्मों के व्यवहार के अध्ययन के रूप में परिभाषित किया गया है।"
                options={["Microeconomics", "Macroeconomics", "Health economics", "Econometrics"]}
                optionsHi={["व्यष्टि अर्थशास्त्र (Microeconomics)", "समष्टि अर्थशास्त्र (Macroeconomics)", "स्वास्थ्य अर्थशास्त्र", "अर्थमिति"]}
                correctAnswer={0}
              />
              <SSCQuestion 
                exam="SSC CHSL 11/08/2023 (1st shift)"
                examHi="एसएससी सीएचएसएल 11/08/2023 (प्रथम पाली)"
                question="Which of these is a component of the tertiary sector of an economy?"
                questionHi="इनमें से कौन सा किसी अर्थव्यवस्था के तृतीयक क्षेत्र (सेवा क्षेत्र) का घटक है?"
                options={["Mining and quarrying", "Water supply", "Electricity", "Hotels and restaurants"]}
                optionsHi={["खनन और उत्खनन", "जल आपूर्ति", "बिजली", "होटल और रेस्तरां"]}
                correctAnswer={3}
              />
            </div>
          ),
          tags: ["Economics", "PYQ"]
        },
        {
          id: "q-culture",
          title: "Art & Culture Questions",
          titleHi: "कला और संस्कृति अभ्यास प्रश्न",
          content: (
            <div className="space-y-4">
              <SSCQuestion 
                exam="SSC GD 10/02/2025 (Morning)"
                examHi="एसएससी जीडी 10/02/2025 (सुबह)"
                question="Which of the following classical dance forms from southern India derives its textual sanction from 'Balarama Bharatam' and 'Hastalakshana Deepika'?"
                questionHi="दक्षिण भारत का कौन सा शास्त्रीय नृत्य रूप 'बलराम भारतम' और 'हस्तलक्षण दीपिका' से अपने प्रामाणिक सिद्धांत प्राप्त करता है?"
                options={["Mohiniattam", "Kuchipudi", "Sattriya", "Kathakali"]}
                optionsHi={["मोहिनीअट्टम", "कुचिपुड़ी", "सत्रिया", "कथकली"]}
                correctAnswer={0}
              />
              <SSCQuestion 
                exam="Graduate Level 25/06/2024 (Shift - 3)"
                examHi="ग्रेजुएट लेवल 25/06/2024 (पाली - 3)"
                question="Select the INCORRECT combination of folk dance and its respective state."
                questionHi="लोक नृत्य और उसके संबंधित राज्य का गलत संयोजन चुनें।"
                options={["Dhangari Gaja - Maharashtra", "Dandiya Raas - Gujarat", "Dollu Kunitha - Karnataka", "Paika - Kerala"]}
                optionsHi={["धनगरी गजा - महाराष्ट्र", "डांडिया रास - गुजरात", "डोलू कुनिथा - कर्नाटक", "पाइका - केरल"]}
                correctAnswer={3}
                explanation="Paika is traditional folk/martial dance from Jharkhand/Odisha, not Kerala."
                explanationHi="पाइका झारखंड और ओडिशा का पारंपरिक लोक/युद्ध नृत्य है, केरल का नहीं।"
              />
              <SSCQuestion 
                exam="SSC CGL 19/09/2024 (2nd Shift)"
                examHi="एसएससी सीजीएल 19/09/2024 (दूसरी पाली)"
                question="In which of the following states is Me-Dam-Me-Phi festival primarily celebrated?"
                questionHi="मे-दम-मे-फी त्यौहार मुख्य रूप से निम्नलिखित में से किस राज्य में मनाया जाता है?"
                options={["Bihar", "Assam", "Nagaland", "Odisha"]}
                optionsHi={["बिहार", "असम", "नागालैंड", "ओडिशा"]}
                correctAnswer={1}
              />
            </div>
          ),
          tags: ["Culture", "PYQ"]
        },
        {
          id: "q-misc",
          title: "Miscellaneous Questions",
          titleHi: "विविध अभ्यास प्रश्न",
          content: (
            <div className="space-y-4">
              <SSCQuestion 
                exam="SSC CHSL 03/07/2024 (1st shift)"
                examHi="एसएससी सीएचएसएल 03/07/2024 (प्रथम पाली)"
                question="Which of the following statements is correct with respect to the Badminton game and match length?"
                questionHi="बैडमिंटन खेल और मैच की अवधि के संबंध में निम्नलिखित में से कौन सा कथन सही है?"
                options={[
                  "A match consists of the best of two games of 21 points",
                  "A match consists of the best of five games of 21 points",
                  "A match consists of the best of three games of 21 points",
                  "A match consists of the best of four games of 21 points"
                ]}
                optionsHi={[
                  "एक मैच में 21 अंकों के सर्वश्रेष्ठ दो गेम होते हैं",
                  "एक मैच में 21 अंकों के सर्वश्रेष्ठ पांच गेम होते हैं",
                  "एक मैच में 21 अंकों के सर्वश्रेष्ठ तीन गेम (बेस्ट ऑफ थ्री) होते हैं",
                  "एक मैच में 21 अंकों के सर्वश्रेष्ठ चार गेम होते हैं"
                ]}
                correctAnswer={2}
              />
              <SSCQuestion 
                exam="SSC MTS 30/10/2024 (3rd Shift)"
                examHi="एसएससी एमटीएस 30/10/2024 (तीसरी पाली)"
                question="Who among the following authors wrote 'Kamayani', 'Dhruvswamini', 'Kankal', 'Titli', 'Skandagupta', 'Lahar' and 'Mamta'?"
                questionHi="निम्नलिखित में से किस लेखक ने 'कामायनी', 'ध्रुवस्वामिनी', 'कंकाल', 'तितली', 'स्कंदगुप्त', 'लहर' और 'ममता' की रचना की?"
                options={["Jaishankar Prasad", "Suryakant Tripathi Nirala", "Bhisham Sahni", "Krishna Sobti"]}
                optionsHi={["जयशंकर प्रसाद", "सूर्यकांत त्रिपाठी 'निराला'", "भीष्म साहनी", "कृष्णा सोबती"]}
                correctAnswer={0}
              />
              <SSCQuestion 
                exam="SSC MTS 30/10/2024 (3rd Shift)"
                examHi="एसएससी एमटीएस 30/10/2024 (तीसरी पाली)"
                question="Atmanirbhar Bharat Rojgar Yojana was launched in which year?"
                questionHi="आत्मनिर्भर भारत रोजगार योजना किस तारीख को शुरू की गई थी?"
                options={["1 October 2020", "2 October 2020", "1 October 2021", "2 October 2021"]}
                optionsHi={["1 अक्टूबर 2020", "2 अक्टूबर 2020", "1 अक्टूबर 2021", "2 अक्टूबर 2021"]}
                correctAnswer={0}
              />
            </div>
          ),
          tags: ["Misc", "PYQ"]
        }
      ]
    }
  ]
};
