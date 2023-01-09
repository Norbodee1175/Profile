import axios from '../api/Axios';
import { useRef ,useState, useEffect, useMemo } from 'react';
import { NavBar } from '../components/NavBar';
import ReportTable from '../hooks/useReportTable';
import Popup from '../hooks/usePopup';
import { CSVLink, CSVDownload } from 'react-csv/src';
import { faCircleCheck, faCircleXmark, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/Register.css'
import '../css/MasterData.css'
import '../css/DateTimePicker/Calendar.css'
import '../css/DateTimePicker/Clock.css'
import '../css/DateTimePicker/DateTimePicker.css'
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import moment from 'moment';

const PRODUCT_REGEX = /^[a-zA-Z0-9-_,]{1,1000}$/;
const OVENNO_REGEX = /^[a-zA-Z0-9-_,]{1,1000}$/;
const COMPONENT_REGEX = /^[a-zA-Z0-9-_,]{1,1000}$/;
const RHRESULT_REGEX = /^[a-zA-Z]{1,20}$/;

const PRODUCT_URL = '/product';
const OVENNO_URL = '/oven';
const COMPONENT_URL = '/component';

export const Report = () => {

    const ECM_URL = "/report";

    const [data, setData] = useState([{id:'', BAKEPRODUCT:'', BAKESHIFT:'', BAKEOVNNUM:'', BAKELOTNAME:'', BAKELOTNUM:'', BAKECOMPONENT:'', BAKEPARTNUM:'', BAKEVENDOR:'', BAKEQTY:'', BAKESTDATETIME:'', BAKESTGID:'', BAKEENDDATETIME:'', BAKEENDGID:'', RHNUM:'', RHSTDATETIME:'', RHENDDATETIME:'', RHVALUE:'', RHTEMP:'', RHRESULT:'', RHSTGID:'', RHENDGID:'', RHRENUM:'', RHRESTDATETIME:'', RHREENDDATETIME:'', RHREVALUE:'', RHRETEMP:'', RHRERESULT:'', RHRESTGID:'', RHREENDGID:'', DVMISTDATETIME:'', DVMIENDDATETIME:'', DVMIFIXNUM:'', DVMILOADQTY:'', DVMIPASSQTY:'', DVMIYIELD:'', DVMIMISALIGNEDQTY:'', DVMILIFTEDQTY:'', DVMIOTHERQTY:'', DVMIREMARK:'', DVMIDONUTPN:'', DVMIDONUTVENDOR:'', DVMIRESULT:'', DVMISTGID:'', DVMIENDGID:'', DISPFLOW:''}])

    const [buttonPopup, setButtonPopup] = useState(false)

    const columns = useMemo(() => [
        {
            Header: "Product",
            accessor: "BAKEPRODUCT",
        },
        {
            Header: "Shift",
            accessor: "BAKESHIFT",
        },
        {
            Header: "Oven No.",
            accessor: "BAKEOVNNUM",
        },
        {
            Header: "Lot Name",
            accessor: "BAKELOTNAME",
        },
        {
            Header: "Component",
            accessor: "BAKECOMPONENT",
        },
        {
            Header: "RH Result",
            accessor: "RHRESULT",
            Cell: row => (
                row.row.original.RHRESULT == 'Pass' ? <button className='rhpass' disabled>Pass</button>
                : row.row.original.RHRESULT == 'Reject' ? <button className='rhreject' disabled>Reject</button>
                : ""
            ),
        },
        {
            Header: "RE_RH Result",
            accessor: "RHRERESULT",
            Cell: row => (
                row.row.original.RHRERESULT == 'Pass' ? <button className='rhpass' disabled>Pass</button>
                : row.row.original.RHRERESULT == 'Reject' ? <button className='rhreject' disabled>Reject</button>
                : ""
            ),
        },
        {
            Header: "VMI Result",
            accessor: "DVMIRESULT",
            Cell: row => (
                <>
                {row.row.original ?
                    row.row.original.DVMIRESULT == 'Pass' ? <button className='rhpass' disabled>Pass</button>
                    : row.row.original.DVMIRESULT == 'Reject' ? <button className='rhreject' disabled>Reject</button>
                    : ""
                : null
                }
                </>
            ),
        },
        {
            Header: "Lot No.",
            accessor: "BAKELOTNUM",
        },
        {
            Header: "Qty.",
            accessor: "BAKEQTY",
        },
        {
            Header: "Bake Start Date/Time",
            accessor: d => {
                return d.BAKESTDATETIME ? 
                <div>
                    {moment(d.BAKESTDATETIME).local().format("DD/MM/YYYY")}<br/>
                    {moment(d.BAKESTDATETIME).local().format("hh:mm a")}
                </div>
                : ""
            },
        },
        {
            Header: "Bake Start GID",
            accessor: "BAKESTGID",
        },
        {
            Header: "Bake End Date/Time",
            accessor: d => {
                return d.BAKEENDDATETIME ?
                    <div>
                        {moment(d.BAKEENDDATETIME).local().format("DD/MM/YYYY")}<br/>
                        {moment(d.BAKEENDDATETIME).local().format("hh:mm a")}
                    </div>
                    : ""
            },
        },
        {
            Header: "Bake End GID",
            accessor: "BAKEENDGID",
        },
        {
            Header: "RH No.",
            accessor: "RHNUM",
        },
        {
            Header: "RH Start Date/Time",
            accessor: d => {
                return d.RHSTDATETIME ? 
                <div>
                    {moment(d.RHSTDATETIME).local().format("DD/MM/YYYY")}<br/>
                    {moment(d.RHSTDATETIME).local().format("hh:mm a")}
                </div>
                : ""
            },
        },
        {
            Header: "RH Start GID",
            accessor: "RHSTGID",
        },
        {
            Header: "RH End Date/Time",
            accessor: d => {
                return d.RHENDDATETIME ?
                    <div>
                        {moment(d.RHENDDATETIME).local().format("DD/MM/YYYY")}<br/>
                        {moment(d.RHENDDATETIME).local().format("hh:mm a")}
                    </div>
                    : ""
            },
        },
        {
            Header: "RH Value(%)",
            accessor: "RHVALUE",
        },
        {
            Header: "RH Temp(°C)",
            accessor: "RHTEMP",
        },
        {
            Header: "RH End GID",
            accessor: "RHENDGID",
        },
        {
            Header: "RE_RH No.",
            accessor: "RHRENUM",
        },
        {
            Header: "RE_Start Date/Time",
            accessor: d => {
                return d.RHRESTDATETIME ? 
                <div>
                    {moment(d.RHRESTDATETIME).local().format("DD/MM/YYYY")}<br/>
                    {moment(d.RHRESTDATETIME).local().format("hh:mm a")}
                </div>
                : ""
            },
        },
        {
            Header: "RE_RH Start GID",
            accessor: "RHRESTGID",
        },
        {
            Header: "RE_End Date/Time",
            accessor: d => {
                return d.RHREENDDATETIME ?
                    <div>
                        {moment(d.RHREENDDATETIME).local().format("DD/MM/YYYY")}<br/>
                        {moment(d.RHREENDDATETIME).local().format("hh:mm a")}
                    </div>
                    : ""
            },
        },
        {
            Header: "RE_RH Value(%)",
            accessor: "RHREVALUE",
        },
        {
            Header: "RE_RH Temp(°C)",
            accessor: "RHRETEMP",
        },
        {
            Header: "RE_RH End GID",
            accessor: "RHREENDGID",
        },
        {
            Header: "ECM P/N",
            accessor: "BAKEPARTNUM",
        },
        {
            Header: "Donut P/N",
            accessor: "DVMIDONUTPN",
        },
        {
            Header: "Fixture No.",
            accessor: "DVMIFIXNUM",
        },
        {
            Header: "VMI Start Date/Time",
            accessor: d => {
                return d.DVMISTDATETIME ? 
                    <div>
                        {moment(d.DVMISTDATETIME).local().format("DD/MM/YYYY")}<br/>
                        {moment(d.DVMISTDATETIME).local().format("hh:mm a")}
                    </div>
                    : ""
            },
        },
        {
            Header: "VMI Start GID",
            accessor: "DVMISTGID",
        },
        {
            Header: "VMI End Date/Time",
            accessor: d => {
                return d.DVMIENDDATETIME ?
                    <div>
                        {moment(d.DVMIENDDATETIME).local().format("DD/MM/YYYY")}<br/>
                        {moment(d.DVMIENDDATETIME).local().format("hh:mm a")}
                    </div>
                    : ""
            },
        },
        {
            Header: "Loading Qty.",
            accessor: "DVMILOADQTY",
        },
        {
            Header: "Pass Qty.",
            accessor: "DVMIPASSQTY",
        },
        {
            Header: "VMI Yield (%)",
            accessor: "DVMIYIELD",
        },
        {
            Header: "Misaligned Qty.",
            accessor: "DVMIMISALIGNEDQTY",
        },
        {
            Header: "Lifted Qty.",
            accessor: "DVMILIFTEDQTY",
        },
        {
            Header: "Other Qty.",
            accessor: "DVMIOTHERQTY",
        },
        {
            Header: "VMI End GID",
            accessor: "DVMIENDGID",
        },
        {
            Header: "Disposition",
            accessor: "DISPFLOW",
        },
    ]);

    const userRef = useRef();
    const errRef = useRef();

    const [product, setProduct] = useState([]);
    const [validProduct, setValidProduct] = useState(false);

    const [ovenno, setOvenno] = useState([]);
    const [validOvenno, setValidOvenno] = useState(false);

    const [component, setComponent] = useState([]);
    const [validComponent, setValidComponent] = useState(false);

    const [rhresult, setRhresult] = useState('');
    const [validRhresult, setValidRhresult] = useState(false);
    const [rhresultFocus, setRhresultFocus] = useState(false);

    const [stbake, setStbake] = useState(new Date());
    const [stbakeFocus, setStbakeFocus] = useState(false);

    const [ebake, setEbake] = useState(new Date());
    const [ebakeFocus, setEbakeFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [dataProduct, setDataProduct] = useState([{PRODUCT:''}])
    const [dataOvenno, setDataOvenno] = useState([{OVENNUM:''}])
    const [dataComponent, setDataComponent] = useState([{COMPONENT:''}])

    useEffect(() => {
        const result = PRODUCT_REGEX.test(product);
        setValidProduct(result);
    }, [product])

    useEffect(() => {
        const result = OVENNO_REGEX.test(ovenno);
        setValidOvenno(result);
    }, [ovenno])

    useEffect(() => {
        const result = COMPONENT_REGEX.test(component);
        setValidComponent(result);
    }, [component])

    useEffect(() => {
        const result = RHRESULT_REGEX.test(rhresult);
        setValidRhresult(result);
    }, [rhresult])

    useEffect(() => {
        setErrMsg('');
    }, [product, ovenno, component, rhresult, stbake, ebake])

    useEffect(() => {
        axios.get(PRODUCT_URL).then((response) => {
        setDataProduct(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get(OVENNO_URL).then((response) => {
        setDataOvenno(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get(COMPONENT_URL).then((response) => {
        setDataComponent(response.data)
        })
    }, [])

    const handleFilter = async (e) => {
        console.log("etestset")
        e.preventDefault();
        // Prevent JS hack
        const v1 = PRODUCT_REGEX.test(product);
        const v2 = OVENNO_REGEX.test(ovenno);
        const v3 = COMPONENT_REGEX.test(component);
        const v4 = RHRESULT_REGEX.test(rhresult);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(ECM_URL, JSON.stringify({ product, ovenno, component, rhresult, startbake, endbake }), 
            {
                headers: { 'content-type' : 'application/json' },
                // withCredentials: true
            }
        );
        setData(response.data)
        setSuccess(true);
        setButtonPopup(false)
        // Clear data
        setProduct([])
        setOvenno([])
        setComponent([])
        setRhresult('')
        setStbake(new Date())
        setEbake(new Date())
        //clear input
        } catch (err) {
            if (!err?.response) {
                console.log(err)
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Filter Data Failed')
            }
            errRef.current.focus();
        }
    }

    const startbake = (stbake.getFullYear() +"/"+ ((stbake.getMonth() + 1).toString().padStart(2, "0")) +"/"+ (stbake.getDate().toString().padStart(2, "0")) +" "+ stbake.getHours() +":"+ stbake.getMinutes() +":"+ stbake.getSeconds())
    const endbake = (ebake.getFullYear() +"/"+ ((ebake.getMonth() + 1).toString().padStart(2, "0")) +"/"+ (ebake.getDate().toString().padStart(2, "0")) +" "+ ebake.getHours() +":"+ ebake.getMinutes() +":"+ ebake.getSeconds())

    const name = (new Date().getFullYear() +"/"+ ((new Date().getMonth() + 1).toString().padStart(2, "0")) +"/"+ (new Date().getDate().toString().padStart(2, "0")) + " " + (new Date().getHours().toString().padStart(2, "0")) +":"+ (new Date().getMinutes().toString().padStart(2, "0")) +":"+ (new Date().getSeconds().toString().padStart(2, "0")))

    const handleClear = (e) => {
        setProduct([])
        setOvenno([])
        setComponent([])
        setRhresult('')
        setStbake(new Date())
        setEbake(new Date())
    }

    return (
        <>
            <NavBar/>
            <div className='masterdata'>
                <div className='headmasterdata'>Report Table Data</div><br/>
                <button className='addinputbtn' onClick={(e) => {setButtonPopup(true)}}>Filter Data</button>
                <CSVLink className='exportbtn' data={data} filename={"ECM Report " + name}>Export CSV</CSVLink>
                {/* <CSVDownload data={data} filename="ECM_Report" target="_blank"/> */}
                <ReportTable columns={columns} data={data}/>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup} cleardata={handleClear}>
                    <section className='register'>
                    <div className='centerregister'>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
                        <h1>Filter Report</h1>
                        <form onSubmit={handleFilter}>
                            <div className="regis">
                                {/* Product */}
                                <div className='productandoven'>
                                <a className='inputbtn'>
                                    Product:&nbsp;
                                    {validProduct ? <FontAwesomeIcon icon={faCircleCheck}/> : null}
                                    {validProduct || !product ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                                </a>
                                    <div className='dropdown'>
                                    {
                                        (dataProduct.length <= 13 ? 
                                            dataProduct.map(
                                                (data) => <>&nbsp;<input type="checkbox" name={data.PRODUCT} value={data.PRODUCT} onChange={(e) => e.target.checked ? setProduct(product.concat(e.target.value)) : setProduct(product.filter(a => a !== e.target.value))} className="checkbox"/>&nbsp;{data.PRODUCT}<br/></>
                                            ) :
                                            dataProduct.map(
                                                (data) => <>&nbsp;<input type="checkbox" name={data.PRODUCT} value={data.PRODUCT} onChange={(e) => e.target.checked ? setProduct(product.concat(e.target.value)) : setProduct(product.filter(a => a !== e.target.value))} className="checkbox"/>&nbsp;{data.PRODUCT}&nbsp;&nbsp;</>
                                            )
                                        ) 
                                    }
                                    </div>
                                </div>
                                {/* Oven No */}
                                <div className='productandoven'>
                                <a className='inputbtn'>
                                    Oven No.:&nbsp;
                                    {validOvenno ? <FontAwesomeIcon icon={faCircleCheck}/> : null}
                                    {validOvenno || !ovenno ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                                </a>
                                    <div className='dropdown'>
                                    {
                                        (dataOvenno.length <= 12 ? 
                                            dataOvenno.map(
                                                (data) => <>&nbsp;<input type="checkbox" name={data.OVENNUM} value={data.OVENNUM} onChange={(e) => e.target.checked ? setOvenno(ovenno.concat(e.target.value)) : setOvenno(ovenno.filter(a => a !== e.target.value))} className="checkbox"/>&nbsp;{data.OVENNUM}<br/></>
                                            ) :
                                            dataOvenno.map(
                                                (data) => <>&nbsp;<input type="checkbox" name={data.OVENNUM} value={data.OVENNUM} onChange={(e) => e.target.checked ? setOvenno(ovenno.concat(e.target.value)) : setOvenno(ovenno.filter(a => a !== e.target.value))} className="checkbox"/>&nbsp;{data.OVENNUM}&nbsp;&nbsp;</>
                                            )
                                        ) 
                                    }
                                    </div>
                                </div>
                                {/* Component */}
                                <div className='productandoven'>
                                <a className='inputbtn'>
                                    Component.:&nbsp;
                                    {validComponent ? <FontAwesomeIcon icon={faCircleCheck}/> : null}
                                    {validComponent || !component ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                                </a>
                                    <div className='dropdown'>
                                    {
                                        (dataComponent.length <= 10 ? 
                                            dataComponent.map(
                                                (data) => <>&nbsp;<input type="checkbox" name={data.COMPONENT} value={data.COMPONENT} onChange={(e) => e.target.checked ? setComponent(component.concat(e.target.value)) : setComponent(component.filter(a => a !== e.target.value))} className="checkbox"/>&nbsp;{data.COMPONENT}<br/></>
                                            ) :
                                            dataComponent.map(
                                                (data) => <>&nbsp;<input type="checkbox" name={data.COMPONENT} value={data.COMPONENT} onChange={(e) => e.target.checked ? setComponent(component.concat(e.target.value)) : setComponent(component.filter(a => a !== e.target.value))} className="checkbox"/>&nbsp;{data.COMPONENT}&nbsp;&nbsp;</>
                                            )
                                        )
                                    }
                                    </div>
                                </div>
                                {/* RH Result */}
                                <label htmlFor="rhresult">
                                    RH Result:&nbsp;
                                    {validRhresult ? <FontAwesomeIcon icon={faCircleCheck}/> : null}
                                    {validRhresult || !rhresult ? null : <FontAwesomeIcon icon={faCircleXmark}/>}
                                </label><br/>
                                <select
                                id='rhresult'
                                onChange={(e) => setRhresult(e.target.value)}
                                required
                                aria-invalid={validRhresult ? "flase" : "true"}
                                aria-describedby="rhresultnote"
                                onFocus={() => setRhresultFocus(true)}
                                onBlur={() => setRhresultFocus(false)}>
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="All">All</option>
                                    <option value="Pass">Pass</option>
                                    <option value="Reject">Reject</option>
                                </select>
                                <p id="rhresultnote" className={rhresultFocus && !validRhresult ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faCircleExclamation} />
                                    Please select RH Result.
                                </p>
                            </div>
                            {/* Start Date/Time */}
                            <label htmlFor='Stbake'>
                                Start Date/Time:&nbsp;
                                <FontAwesomeIcon icon={faCircleCheck}/>
                            </label>
                            <DateTimePicker className="datetime" onChange={setStbake} value={stbake} format={"dd/MM/y h:mm a"} onFocus={() => setStbakeFocus(true)} onBlur={() => setStbakeFocus(false)} clearIcon={null}/>
                            {/* End Date/Time */}
                            <label htmlFor='Ebake'>
                                End Date/Time:&nbsp;
                                <FontAwesomeIcon icon={faCircleCheck}/>
                            </label>
                            <DateTimePicker className="datetime" onChange={setEbake} value={ebake} format={"dd/MM/y h:mm a"} onFocus={() => setEbakeFocus(true)} onBlur={() => setEbakeFocus(false)} clearIcon={null}/>
                            {/* Button */}
                            <button className="registerbtn" disabled={!validProduct || !validOvenno || !validComponent || !validRhresult ? true : false}>Submit</button>
                        </form>
                    </div>
                    </section>
                </Popup>
            </div>
        </>
    )
}