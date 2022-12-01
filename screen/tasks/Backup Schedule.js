import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform
} from "react-native";
import moment from 'moment';

const schedule = require('../../../assets/tasks/schedule.png')

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown-v2'
import Theme from "../../../Theme";
import DateTimePicker from "./ScheduleOnce";
import colors from "../../../config/colors";
import { Colors } from "../../../config";
import globalStyles from "../../config/Styles";
import styles from "./Styles";


class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            schedule:[
                {text:'Once',value:"one"},
                {text:'Daily',value:"daily"},
                {text:'Weekly',value:"weekly"},
                {text:'Monthly',value:"monthly"},
            ],
            dateFormat:'YYYY/MM/DD',
            timeFormat:'HH:mm',
            selected: null
        }
    }

    componentDidMount() {
        this.setState({
            selected:this.props.selected_schedule_type
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            selected:nextProps.selected_schedule_type
        })
    }

    onPress=(value)=>{
        this.setState({
            selected: value
        },()=>{
            this.props.onPress(this.state.selected)
        })
    }

    render() {
        return (
            <View>
                <View style={[styles.wrapper,{marginTop:1}]}>
                    <ScrollView horizontal={true} >
                        {
                            this.state.schedule.map((value, index)=>{
                                let color=colors.white;
                                if (value.value===this.state.selected){
                                    color= colors.primary;
                                }
                                return(
                                    <TouchableOpacity onPress={() => this.onPress(value.value)}
                                                      style={[styles.selectWrapper, { borderColor: color }]}>
                                        <Image source={schedule} style={styles.img} />
                                        <Text style={{color:Colors.textColor}}>{value.text}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                {this.state.selected === "one" ?
                    <Once
                        date={this.props.selected_schedule_start}
                        time={this.props.selected_schedule_time}
                        dateformat={this.state.dateFormat}
                        timeformat={this.state.timeFormat}
                        onPressStartDate={this.props.onPressStartDate}
                        onPressTime={this.props.onPressTime}
                    /> :
                    (this.state.selected === 'daily' ? <Daily
                            date={this.props.selected_schedule_start}
                            enddate={this.props.selected_schedule_end}
                            time={this.props.selected_schedule_time}
                            dateformat={this.state.dateFormat}
                            timeformat={this.state.timeFormat}
                            onPressStartDate={this.props.onPressStartDate}
                            onPressEndDate={this.props.onPressEndDate}
                            onPressTime={this.props.onPressTime}
                        /> :
                        (this.state.selected === 'weekly' ? <Weekly
                                date={this.props.selected_schedule_start}
                                enddate={this.props.selected_schedule_end}
                                time={this.props.selected_schedule_time}
                                dateformat={this.state.dateFormat}
                                timeformat={this.state.timeFormat}
                                onPressStartDate={this.props.onPressStartDate}
                                onPressEndDate={this.props.onPressEndDate}
                                onPressTime={this.props.onPressTime}
                                selectedWeek={this.props.selected_schedule_weekly}
                                onWeekDay={this.props.onScheduleWeek}
                            /> :
                            (this.state.selected === 'monthly' ? <Monthly
                                date={this.props.selected_schedule_start}
                                enddate={this.props.selected_schedule_end}
                                time={this.props.selected_schedule_time}
                                dateformat={this.state.dateFormat}
                                timeformat={this.state.timeFormat}
                                onPressStartDate={this.props.onPressStartDate}
                                onPressEndDate={this.props.onPressEndDate}
                                onPressTime={this.props.onPressTime}
                                selectedMonthly={this.props.selected_schedule_monthly}
                                onScheduleMonthly={this.props.onScheduleMonthly}
                            /> : null)))
                }
            </View>
        );
    }
}
export default Schedule;

//sections based on what is selected

const Once =(props)=>{
    const [isDateTimePickerVisible, setDatePickerVisibility] = useState(false);
    const [mode, setMode] = useState('date');
    const [date,setDate] = useState(props.date);
    const [time,setTime] = useState(props.time);
    const [display, setDisplay] = useState('');

    const showDatePicker = (mode) => {
        if(mode =='date'){
            setDisplay('inline')
        }
        setMode(mode)
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDisplay('')
        setDatePickerVisibility(false);
    };

    const handleConfirm = selectedDate => {
        if (mode==="date"){
            let startDate = moment(new Date()).format(props.dateformat);
            let endDate = moment(selectedDate).format(props.dateformat);

            if (startDate<endDate){
                setDate(moment(selectedDate).format(props.dateformat))

                props.onPressStartDate(moment(selectedDate).format(props.dateformat))
            }else {
                alert('Please Select Date Today +1 Day')
            }
        }else if (mode==="time"){
            setTime(moment(selectedDate).format(props.timeformat));
            props.onPressTime(moment(selectedDate).format(props.timeformat))
        }
        hideDatePicker();
    };

    return (
        <View style={styles.wrapper}>
            <View>
                <TouchableOpacity onPress={()=> {
                    showDatePicker('date')
                }}>
                    <Text style={{color:Colors.textColor}}>{date}</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={()=>{showDatePicker('time')}}>
                    <Text style={{color:Colors.textColor}}>{time}</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                display= {Platform.OS=='ios' ? display:'default'} 
                mode={mode}
                isVisible={isDateTimePickerVisible}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

const Daily =(props)=>{

    const [isDateTimePickerVisible, setDatePickerVisibility] = useState(false);
    const [type, setType] = useState('startDate');
    const [mode, setMode] = useState('date');
    const [date,setDate] = useState(props.date);
    const [enddate,setEnddate] = useState(props.enddate);
    const [time,setTime] = useState(props.time);
    const [display, setDisplay] = useState('');

    const showDatePicker = (mode,type) => {
        if(mode =='date'){
            setDisplay('inline')
        }
        setMode(mode)
        setType(type)
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDisplay('')
        setDatePickerVisibility(false);
    };

    const handleConfirm = selectedDate => {
        if (mode==="date"){
            if (type==="startDate"){
                let startDate = moment(new Date()).format(props.dateformat);
                let endDate = moment(selectedDate).format(props.dateformat);
                if (startDate<endDate){
                    setDate(moment(selectedDate).format(props.dateformat))
                    props.onPressStartDate(moment(selectedDate).format(props.dateformat))
                }else {
                    alert('Please Select Date Today 1+ Day')
                }
            }else if (type==="endDate"){
                var startDate = moment(date, props.dateformat);
                var endDate = moment(selectedDate, props.dateformat);
                var result = endDate.diff(startDate, 'days');
                if (result<=730){
                    setEnddate(moment(selectedDate).format(props.dateformat))
                    props.onPressEndDate(moment(selectedDate).format(props.dateformat))
                }else {
                    alert('Please Select End Date Start Date To 730 between Day')
                }
            }
        }else if (mode==="time"){

            setTime(moment(selectedDate).format(props.timeformat));
            props.onPressTime(moment(selectedDate).format(props.timeformat))
        }
        hideDatePicker();
    };

   const handler=(dates)=>{
        console.log(dates)
    }

    return (
        <View style={styles.wrapper}>
            <View style={[globalStyles.flexDirectionRow,globalStyles.justifyContentSpaceEvenly,globalStyles.width100]}>
                <View style={globalStyles.alignItemsCenter}>
                    <Text style={{color:Colors.textColor}}>STARTS ON</Text>
                    <TouchableOpacity onPress={()=>{showDatePicker('date','startDate')}} style={styles.dateContainer}>
                        <Text style={{ color: 'green' }}>{date}</Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.alignItemsCenter}>
                    <Text style={{color:Colors.textColor}}>ENDS ON</Text>
                    <TouchableOpacity onPress={()=>{showDatePicker('date','endDate')}} style={styles.dateContainer}>
                        <Text style={{ color: 'red' }}>{enddate}</Text>
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.alignItemsCenter}>
                    <Text style={{color:Colors.textColor}}>DUE BY</Text>
                    <TouchableOpacity onPress={()=>{showDatePicker('time','time')}} style={styles.dateContainer}>
                        <Text style={{color:Colors.textColor}}>{time}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <DateTimePickerModal
                display= {Platform.OS=='ios' ? display:'default'} 
                mode={mode}
                isVisible={isDateTimePickerVisible}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

const Weekly =(props)=>{
    const [isDateTimePickerVisible, setDatePickerVisibility] = useState(false);
    const [type, setType] = useState('startDate');
    const [mode, setMode] = useState('date');
    const [date,setDate] = useState(props.date);
    const [enddate,setEnddate] = useState(props.enddate);
    const [time,setTime] = useState(props.time);
    const [selectedWeek,setSelectedWeek] = useState(props.selectedWeek);
    const [weekDay,setWeekDay] = useState([
        {name:'M',value:'Mo',color:Theme.primary,isSelect:false},
        {name:'T',value:'Tu',color:Theme.primary,isSelect:false},
        {name:'W',value:'We',color:Theme.primary,isSelect:false},
        {name:'T',value:'Th',color:Theme.primary,isSelect:false},
        {name:'F',value:'Fr',color:Theme.primary,isSelect:false},
        {name:'S',value:'Sa',color:Theme.primary,isSelect:false},
        {name:'s',value:'Su',color:Theme.primary,isSelect:false},
    ]);
    const [display, setDisplay] = useState('');

    const showDatePicker = (mode,type) => {
        if(mode =='date'){
            setDisplay('inline')
        }
        setMode(mode)
        setType(type)
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDisplay('')
        setDatePickerVisibility(false);
    };

    const handleConfirm = selectedDate => {
        if (mode==="date"){
            if (type==="startDate"){
                let startDate = moment(new Date()).format(props.dateformat);
                let endDate = moment(selectedDate).format(props.dateformat);
                if (startDate<endDate){
                    setDate(moment(selectedDate).format(props.dateformat))
                    props.onPressStartDate(moment(selectedDate).format(props.dateformat))
                }else {
                    alert('Please Select Date Today 1+ Day')
                }
            }else if (type==="endDate"){
                var startDate = moment(date, props.dateformat);
                var endDate = moment(selectedDate, props.dateformat);
                var result = endDate.diff(startDate, 'days');
                if (result<=730){
                    setEnddate(moment(selectedDate).format(props.dateformat))
                    props.onPressEndDate(moment(selectedDate).format(props.dateformat))
                }else {
                    alert('Please Select End Date Start Date To 730 between Day')
                }
            }
        }else if (mode==="time"){
            setTime(moment(selectedDate).format(props.timeformat));
            props.onPressTime(moment(selectedDate).format(props.timeformat))
        }
        hideDatePicker();
    };

    const setWeek = (v) => {
        console.log(v);
        let value = v.value;
        let arr = selectedWeek;
        
        let index = arr.findIndex((element) => element.value === v.value);

        if (index > -1) {
            arr = arr.filter((element) => element.value !== v.value);
        } else {
            arr.push(v);
        }

        v.isSelect = !v.isSelect;
        const index2 = weekDay.findIndex(
            item => v.value === item.value
        )
        weekDay[index2] = v
        console.log(arr);
        setSelectedWeek(arr);
        setWeekDay(weekDay)
        props.onWeekDay(v.value)
    }

    return (
        <View style={[styles.wrapper, { flexDirection: 'column' }]}>

            <View style={[globalStyles.flexDirectionRow,globalStyles.justifyContentSpaceEvenly,globalStyles.width100,
                { marginVertical: 15}]}>
                {
                    weekDay.map((value, index)=>{
                        let color=Theme.primary;
                        if (value.isSelect){
                            color='#7c7c7c';
                        }
                        return(
                            <TouchableOpacity
                                onPress={()=> {
                                    setWeek(value)
                                }}
                                style={[styles.daybtn, { backgroundColor: color }]}>
                                <Text style={{ color: '#fff' }}>{value.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            <View style={[globalStyles.flexDirectionRow,globalStyles.justifyContentSpaceEvenly,globalStyles.width100]}>
                <View style={globalStyles.alignItemsCenter}>
                    <Text style={{color:Colors.textColor}}>STARTS ON</Text>
                    <TouchableOpacity onPress={()=>{ showDatePicker('date','startDate') }} style={styles.dateContainer}>
                        <Text style={{ color: 'green' }}>{date}</Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.alignItemsCenter}>
                    <Text style={{color:Colors.textColor}}>ENDS ON</Text>
                    <TouchableOpacity onPress={()=>{ showDatePicker('date','endDate') }} style={styles.dateContainer}>
                        <Text style={{ color: 'red' }}>{enddate}</Text>
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.alignItemsCenter}>
                    <Text style={{color:Colors.textColor}}>DUE BY</Text>
                    <TouchableOpacity onPress={()=>{showDatePicker('time','time')}} style={styles.dateContainer}>
                        <Text style={{color:Colors.textColor}}>{time}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <DateTimePickerModal
            display= {Platform.OS=='ios' ? display:'default'} 
                mode={mode}
                isVisible={isDateTimePickerVisible}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

const Monthly =(props)=>{
    const [isDateTimePickerVisible, setDatePickerVisibility] = useState(false);
    const [type, setType] = useState('startDate');
    const [mode, setMode] = useState('date');
    const [date,setDate] = useState(props.date);
    const [enddate,setEnddate] = useState(props.enddate);
    const [time,setTime] = useState(props.time);
    const [selectedMonth,setSelectedMonth] = useState(props.selectedMonthly);
    const [monthDay,setMonthDay] = useState(
        [{
            value: '1',
        }, {
            value: '2',
        }, {
            value: '3',
        }, {
            value: '4',
        }, {
            value: '5',
        }, {
            value: '6',
        }, {
            value: '7',
        }, {
            value: '8',
        }, {
            value: '9',
        }, {
            value: '10',
        }, {
            value: '11',
        }, {
            value: '12',
        }]);
        const [display, setDisplay] = useState('');

    const showDatePicker = (mode,type) => {
        if(mode =='date'){
            setDisplay('inline')
        }
        setMode(mode)
        setType(type)
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDisplay('')
        setDatePickerVisibility(false);
    };

    const handleConfirm = selectedDate => {
        if (mode==="date"){
            if (type==="startDate"){
                let startDate = moment(new Date()).format(props.dateformat);
                let endDate = moment(selectedDate).format(props.dateformat);
                if (startDate<endDate){
                    setDate(moment(selectedDate).format(props.dateformat))
                    props.onPressStartDate(moment(selectedDate).format(props.dateformat))
                }else {
                    alert('Please Select Date Today 1+ Day')
                }
            }else if (type==="endDate"){
                var startDate = moment(date, props.dateformat);
                var endDate = moment(selectedDate, props.dateformat);
                var result = endDate.diff(startDate, 'days');
                if (result<=730){
                    setEnddate(moment(selectedDate).format(props.dateformat))
                    props.onPressEndDate(moment(selectedDate).format(props.dateformat))
                }else {
                    alert('Please Select End Date Start Date To 730 between Day')
                }
            }
        }else if (mode==="time"){

            setTime(moment(selectedDate).format(props.timeformat));
            props.onPressTime(moment(selectedDate).format(props.timeformat))
        }
        hideDatePicker();
    };

    return (
        <View style={[styles.wrapper, { flexDirection: 'column' }]}>
            <View style={[globalStyles.width90,
                {marginBottom: 15 }]}>
                <Dropdown
                    value={selectedMonth}
                    label='PICK MONTH'
                    data={monthDay}
                    onChangeText={(text)=>{
                        setSelectedMonth(text)
                        props.onScheduleMonthly(text)
                    }}
                />
            </View>
            <View style={[globalStyles.flexDirectionRow,globalStyles.justifyContentSpaceEvenly,globalStyles.width100]}
              >
                <View style={globalStyles.alignItemsCenter}>
                    <Text  style={{color:Colors.textColor}}>STARTS ON</Text>
                    <TouchableOpacity onPress={()=>{ showDatePicker('date','startDate') }} style={styles.dateContainer}>
                        <Text style={{ color: 'green' }}>{date}</Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.alignItemsCenter}>
                    <Text  style={{color:Colors.textColor}}>ENDS ON</Text>
                    <TouchableOpacity onPress={()=>{ showDatePicker('date','endDate') }} style={styles.dateContainer}>
                        <Text style={{ color: 'red' }}>{enddate}</Text>
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.alignItemsCenter}>
                  
                    <Text  style={{color:Colors.textColor}}>DUE BY</Text>
                    <TouchableOpacity onPress={()=>{showDatePicker('time','time')}} style={styles.dateContainer}>
                        <Text style={{color:Colors.textColor}}>{time}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <DateTimePickerModal
                display= {Platform.OS=='ios' ? display:'default'} 
                mode={mode}
                isVisible={isDateTimePickerVisible}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

// const styles = StyleSheet.create({
//     wrapper: {
//         borderWidth: 1,
//         borderColor: '#e5e5e5',
//         paddingHorizontal: 10,
//         paddingVertical: 10,
//         borderRadius: 3,
//         width: '100%',
//         marginTop: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },
//     selectWrapper: {
//         borderRadius: 10,
//         borderWidth: 1,
//         height: 90,
//         width: 75,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 5,
//         marginLeft: 5
//     },
//     img: { resizeMode: 'contain', height: 35, width: 35, marginBottom: 5 },
//     dateContainer: {
//         borderWidth: 1,
//         borderRadius: 3,
//         paddingVertical: 5,
//         marginTop: 5,
//         borderColor: '#e5e5e5',
//         paddingHorizontal: 15
//     },
//     daybtn: {
//         padding: 5,
//         borderRadius: 3,
//         height: 45,
//         width: 45,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });
