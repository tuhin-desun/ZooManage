import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Dates from 'react-native-dates';
import moment from 'moment';

export default class DateTimePicker extends Component {
    state = {
        date: null,
        focus: 'startDate',
        startDate: null,
        endDate: null
    }

    render() {
        const isDateBlocked = (date) =>
            date.isBefore(moment(), 'day');

        const onDatesChange = ({ startDate, endDate, focusedInput }) =>
            this.setState({ ...this.state, focus: focusedInput }, () =>
                this.setState({ ...this.state, startDate, endDate })
            );

        const onDateChange = ({ date }) =>
            this.setState({ ...this.state, date });

        return (
            <View style={styles.container}>
                <Dates
                    onDatesChange={onDatesChange}
                    isDateBlocked={isDateBlocked}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    focusedInput={this.state.focus}
                    focusedMonth={ moment('05/09/2030','DD/MM/YYYY')}
                    range
                />

                <Dates
                    date={this.state.date}
                    onDatesChange={onDateChange}
                    isDateBlocked={isDateBlocked}
                />

                {this.state.date && <Text style={styles.date}>{this.state.date && this.state.date.format('LL')}</Text>}
                <Text style={[styles.date, this.state.focus === 'startDate' && styles.focused]}>{this.state.startDate && this.state.startDate.format('LL')}</Text>
                <Text style={[styles.date, this.state.focus === 'endDate' && styles.focused]}>{this.state.endDate && this.state.endDate.format('LL')}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        marginTop: 20
    },
    date: {
        marginTop: 50
    },
    focused: {
        color: 'blue'
    }
});
