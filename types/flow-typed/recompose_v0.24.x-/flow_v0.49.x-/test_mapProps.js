/* globals */
/* eslint-disable no-unused-vars, no-unused-expressions, arrow-body-style */
/* @flow */
import React from 'react'
import { Observable } from 'rxjs'
import { compose, mapProps, withProps } from 'recompose'

import type { HOC } from 'recompose'

type EnhancedCompProps = { eA: 1 }

const Comp = ({ a }) =>
  <div>
    {(a: string)}
    {
      // $ExpectError
      (a: number)
    }
  </div>

const enhacer: HOC<*, EnhancedCompProps> = compose(
  mapProps(p => ({
    a: '1',
  })),
  // If you need to to detect erros after a mapProps HOC
  // you need to explicitly set Types for all HOCs below
  // seems like this https://github.com/facebook/flow/issues/4342 issue
  withProps(props => ({
    a: (props.a: string),
    // Must $ ExpectError but not
    e: Math.round(props.a),
  }))
)

enhacer(Comp)
