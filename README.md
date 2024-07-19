# bezkolezki-auto-reservation
## Automatic seat reservations on bezkolejki.eu
### Installation

-------
    npm install bezkolejki-auto-reservation

### Usage
--------

```js
const {start} = require("bezkolejki-auto-reservation");
start()
```
## The script was originally written for captcha solutions on the ANTIGATE service


[anti-captcha.com](https://getcaptchasolution.com/vt9akg8svv)

## You can also use the CAPSOLVER service to solve the captcha (however, hcaptcha is not stable there)


[capsolver.com](https://dashboard.capsolver.com/passport/register?inviteCode=EYZL0Y7ywYIE)

## Explanations of the value of variables in config.js

> INTERVAL_OVERWRITES_TOKEN 
>> Since the lifetime of the recaptcha token (hcaptcha token) is limited, if more time has passed since receiving the token than is written to the variable, it will be overwritten

> DELAY_BETWEEN_REQUEST
>> The delay between requests, if the value is less than 500, you must use a proxy (otherwise your IP will be blocked on this site)

> HOUR_START , MINUTE_START
>> If the time is less than the values, the script is in standby mode

> HOUR_START_RESERVATIONS , MINUTE_START_RESERVATIONS , SECOND_START_RESERVATIONS , MILISECOND_START_RESERVATIONS
>> If the time is less than the values, the script will not send requests, however, the proxy will be checked and the solutions tokens will accumulate

> COUNT_DELAY_LENGTH_CAPTCHA
>> If the solved tokens for each step are less than this value, the script will not proceed to the next step, but will wait until the number of solved tokens is greater than or equal to the number specified in this variable

> COUNT_CAPTCHA_STEP_ONE , COUNT_CAPTCHA_STEP_OTHER
>> The number of threads that will request CAPTCHA solutions is correspondingly for the first step and the other three steps, be careful with these values since this is done asynchronously

> COUNT_ITERATION
>> Number of booking attempts

> COMPANY
>> Subdomain on bezkolejki.eu you can view all subdomains in Id-operation.txt

> OPERATION
>> Operation ID all operation IDs can be viewed in Id-operation.txt

> REFLOW
>> If false, the number of CAPTCHA solution requests is equal to the number in the variables COUNT_CAPTCHA_STEP_ONE , COUNT_CAPTCHA_STEP_OTHER and will not re-request solutions

>> If true, it will resend requests for CAPTCHA solutions so that there are always solutions.