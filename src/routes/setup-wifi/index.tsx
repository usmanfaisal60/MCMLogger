import React from 'react'
import { Route } from 'react-router-dom'
import { routeNames } from '../../services'
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';

export default ([
    <Route exact key={routeNames.connection} path={routeNames.connection} component={Step1} />,
    <Route exact key={routeNames.connection2} path={routeNames.connection2} component={Step2} />,
    <Route exact key={routeNames.connection3} path={routeNames.connection3} component={Step3} />,
    <Route exact key={routeNames.connection4} path={routeNames.connection4} component={Step4} />
]
);
