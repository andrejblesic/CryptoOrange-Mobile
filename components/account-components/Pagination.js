import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

export default function Pagination({currPage, lastPage, prevPageUrl, nextPageUrl, firstPageUrl, lastPageUrl, loadPage}) {

    useEffect(() => {
        console.log('CURRENT PAGE INFO', typeof currPage, currPage, nextPageUrl);
    });

    return(
        <View style={styles.paginationWrapperStyle}>
            <View style={styles.leftPaginationGroupWrapperStyle}>
                {currPage > 1 && <TouchableOpacity style={styles.paginationBtnStyle} onPress={() => loadPage(firstPageUrl)}><Text style={{color: 'orange', fontWeight: 'bold'}}>{'<<'}</Text></TouchableOpacity>}
                {currPage > 1 && <TouchableOpacity style={styles.paginationBtnStyle} onPress={() => loadPage(prevPageUrl)}><Text style={{color: 'orange', fontWeight: 'bold'}}>{'<'}</Text></TouchableOpacity>}
            </View>
            <View style={styles.pageNumberWrapper}>
                {Number(lastPage) > 1 && <Text style={styles.pageNumber}>Page {currPage} / {lastPage}</Text>}
            </View>
            <View style={styles.rightPaginationGroupWrapperStyle}>
                {currPage < lastPage && <TouchableOpacity style={styles.paginationBtnStyle} onPress={() => loadPage(nextPageUrl)}><Text style={{color: 'orange', fontWeight: 'bold'}}> {'>'} </Text></TouchableOpacity>}
                {currPage < lastPage && <TouchableOpacity style={styles.paginationBtnStyle} onPress={() => loadPage(lastPageUrl)}><Text style={{color: 'orange', fontWeight: 'bold'}}> {'>>'} </Text></TouchableOpacity>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    paginationWrapperStyle: {
        width: '98%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    rightPaginationGroupWrapperStyle: {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    leftPaginationGroupWrapperStyle: {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    paginationBtnStyle: {
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 3,
        width: 40,
        height: 30,
        // margin: '1%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageNumberWrapper: {
        flex: 1,
    },
    pageNumber: {
        textAlign: 'center'
    }
});