/*
 * Copyright (c) 2021 Infront X, LLC. All rights reserved.
 *
 * This software is the confidential and proprietary information of Omnigon Communications, LLC
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall access and use it only
 * in accordance with the terms of the license agreement you entered into with Omnigon Communications, LLC, its
 * subsidiaries, affiliates or authorized licensee. Unless required by applicable law or agreed to in writing, this
 * Confidential Information is provided on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the license agreement for the specific language governing permissions and limitations.
 */

const runCallbacks = (callbacks: any[], value: any) => {
    callbacks.forEach((callback) => {
        callback(value);
    })
}

export const watch = (context: any, prop: string, onChange: (newValue: any) => void) => {
    let value = context[prop];
    context.__callbacks__ = context.__callbacks__ || [];
    context.__callbacks__.push(onChange);

    runCallbacks(context.__callbacks__, value);

    Object.defineProperty(context, prop, {
        get() {
            return value;
        },

        set(v) {
            value = v;
            runCallbacks(context.__callbacks__, value);
        }
    })
}
