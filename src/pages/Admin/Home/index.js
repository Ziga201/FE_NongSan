import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
// import React from 'react';
import { faCartPlus, faChartPie, faChartSimple, faCircleRight, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '~/pages/Admin/Home/Home.module.scss';
import { Link } from 'react-router-dom';
import '@fontsource/source-sans-pro'; // Defaults to weight 400
import '@fontsource/source-sans-pro/400.css'; // Specify weight
import '@fontsource/source-sans-pro/400-italic.css'; // Specify weight and style

import checkoutService from '~/services/checkoutService';
import accountService from '~/services/accountService';

import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const cx = classNames.bind(style);

function Home() {
    const [checkouts, setCheckouts] = useState({});
    const [accounts, setAccounts] = useState({});

    const fetchCheckouts = async () => {
        setCheckouts((await checkoutService.getCheckouts()).data.data);
    };
    useEffect(() => {
        fetchCheckouts();
    }, []);

    const fetchAccounts = async () => {
        setAccounts((await accountService.getAccounts()).data.data);
    };
    useEffect(() => {
        fetchAccounts();
    }, []);

    const totalSales = Object.values(checkouts).reduce((acc, item) => acc + parseInt(item.total), 0);

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: 'light2', //"light1", "dark1", "dark2"
        title: {
            // text: 'Thống kê doanh số',
        },
        axisY: {
            includeZero: true,
        },
        data: [
            {
                type: 'area', //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: '#5A5757',
                indexLabelPlacement: 'outside',
                dataPoints: [
                    { x: 1, y: 71 },
                    { x: 2, y: 55 },
                    { x: 3, y: 50 },
                    { x: 4, y: 65 },
                    { x: 5, y: 71 },
                    { x: 6, y: 68 },
                    { x: 7, y: 38 },
                    { x: 8, y: 92, indexLabel: 'Cao nhất' },
                    { x: 9, y: 54 },
                    { x: 10, y: 60 },
                ],
            },
        ],
    };
    return (
        <>
            <div className={cx('hug')}>
                <div className={cx('wrapper')}>
                    <div className={cx('row')}>
                        <div className={cx('col-md-3')}>
                            <div className={cx('item', 'bg-1')}>
                                <div className={cx('info')}>
                                    <div className={cx('data')}>
                                        <div className={cx('number')}>{checkouts.length}</div>
                                        <div className={cx('text')}>Tổng đơn hàng</div>
                                    </div>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon className={cx('icon-item')} icon={faCartPlus} />
                                    </div>
                                </div>
                                <Link to="/admin/checkout">
                                    <div className={cx('more')}>
                                        Chi tiết <FontAwesomeIcon className={cx('more-item')} icon={faCircleRight} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={cx('col-md-3')}>
                            <div className={cx('item', 'bg-2')}>
                                <div className={cx('info')}>
                                    <div className={cx('data')}>
                                        <div className={cx('number')}>{accounts.length}</div>
                                        <div className={cx('text')}>Khách hàng mới</div>
                                    </div>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon className={cx('icon-item')} icon={faUserPlus} />
                                    </div>
                                </div>
                                <Link to="/admin/account">
                                    <div className={cx('more')}>
                                        Chi tiết <FontAwesomeIcon className={cx('more-item')} icon={faCircleRight} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={cx('col-md-3')}>
                            <div className={cx('item', 'bg-3')}>
                                <div className={cx('info')}>
                                    <div className={cx('data')}>
                                        <div className={cx('number')}>{totalSales.toLocaleString('vi-VN')} VND</div>
                                        <div className={cx('text')}>Tổng danh số</div>
                                    </div>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon className={cx('icon-item')} icon={faChartSimple} />
                                    </div>
                                </div>
                                <Link to="/admin/checkout">
                                    <div className={cx('more')}>
                                        Chi tiết <FontAwesomeIcon className={cx('more-item')} icon={faCircleRight} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={cx('col-md-3')}>
                            <div className={cx('item', 'bg-4')}>
                                <div className={cx('info')}>
                                    <div className={cx('data')}>
                                        <div className={cx('number')}>150</div>
                                        <div className={cx('text')}>Tổng lợi nhuận</div>
                                    </div>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon className={cx('icon-item')} icon={faChartPie} />
                                    </div>
                                </div>
                                <Link to="/">
                                    <div className={cx('more')}>
                                        Chi tiết <FontAwesomeIcon className={cx('more-item')} icon={faCircleRight} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <CanvasJSChart options={options} />
                </div>
            </div>
        </>
    );
}

export default Home;
