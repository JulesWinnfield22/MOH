<script setup>
  import { useCertificaets } from '@/features/reqeusts/store/approvedStore'
  import { useRoute } from 'vue-router';
  import { useApiRequest } from '@composable/useApiRequest'
  import { getRequestedPerson } from '../../reqeusts/api/requestsApi'
  import QrCode from 'qrcode.vue'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { formatCurrency, secondDateFormat } from '@/utils/utils';
  import { getAgencyById } from '@/features/agencies/api/agenciesApi'
  import FormLoading from '@/components/FormLoading.vue';

  const req = useApiRequest()
  const agencyReq = useApiRequest()

  const store = useCertificaets()

  onMounted(() => {
    document.body.style.overflow = 'scroll'
  })
  
  onUnmounted(() => {
    document.body.style.overflow = 'hidden'
  })

  const route = useRoute()
  const id = route.params.id
  const agencyId = route.params.agencyId
  
  const value = ref('')

  const response = {
  data: '',
  success: true,
}

async function getCertificateData() {
  let res = await Promise.all([getRequestedPerson(id), getAgencyById(agencyId)])
  
  res = res.reduce(function(acc, val, i) {
    if(i == 0) {
      acc.insured = val.data
    }
    
    if(i == 1) {
      acc.agency = val.data
    }

    return acc
  }, {
    insured: {},
    agency: {},
  })

  response.data = res
  response.success = true
  return response
}

const insured = ref()
const agency = ref()

  req.send(
    () => getRequestedPerson(id),
    res => {
      console.log(res)
      if(res.success) {
        value.value = `${insured?.title} ${insured?.firstName} ${insured?.firstName} (${insured?.gender}) (${insured?.beginDate}) - (${insured?.endDate}) `
        value.value = import.meta.env?.v_CERTIFICATE_URL + '/member_detail/certificate/' + id + '/' + agencyId
      }
    }
  )

  agencyReq.send(
    () => getCertificateData(agencyId),
    res => {
      console.log(res)
      insured.value = res.data?.insured
      agency.value = res.data?.agency
    }
  )

  function getAge(value) {
    var date = new Date(value)

    var noe = new Date()

    var diff = noe.getFullYear() - date.getFullYear();
    return diff
  }

  let level = 'M'
  let renderedAs = 'svg'

  let payment = import.meta.env.v_PAYMENT_AMOUNT

  function print() {
  var originalContents = document.body.innerHTML;

  var printableDiv = document.getElementById("printable").cloneNode(true);

  var printWindow = window.open('', '_blank');
  printWindow.document.open();

  // Add the cloned div to the new window's document
  printWindow.document.write(`<html>
  <head>
    <link rel="stylesheet" href="./output.css" />
    <title>Print</title>
    <style>
    /*
! tailwindcss v3.3.5 | MIT License | https://tailwindcss.com
*/

/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e5e7eb;
  /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured "sans" font-family by default.
5. Use the user's configured "sans" font-feature-settings by default.
6. Use the user's configured "sans" font-variation-settings by default.
*/

html {
  line-height: 1.5;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  -moz-tab-size: 4;
  /* 3 */
  -o-tab-size: 4;
     tab-size: 4;
  /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* 4 */
  font-feature-settings: normal;
  /* 5 */
  font-variation-settings: normal;
  /* 6 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from "html" so users can set them as a class directly on the "html" element.
*/

body {
  margin: 0;
  /* 1 */
  line-height: inherit;
  /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0;
  /* 1 */
  color: inherit;
  /* 2 */
  border-top-width: 1px;
  /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured "mono" font family by default.
2. Correct the odd "em" font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent "sub" and "sup" elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-feature-settings: inherit;
  /* 1 */
  font-variation-settings: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  font-weight: inherit;
  /* 1 */
  line-height: inherit;
  /* 1 */
  color: inherit;
  /* 1 */
  margin: 0;
  /* 2 */
  padding: 0;
  /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
  /* 1 */
  background-color: transparent;
  /* 2 */
  background-image: none;
  /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional ":invalid" styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to "inherit" in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/

dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/

:disabled {
  cursor: default;
}

/*
1. Make replaced elements "display: block" by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add "vertical-align: middle" to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  /* 1 */
  vertical-align: middle;
  /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */

[hidden] {
  display: none;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

.container {
  width: 100%;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}

.pointer-events-none {
  pointer-events: none;
}

.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.sticky {
  position: sticky;
}

.inset-0 {
  inset: 0px;
}

.bottom-0 {
  bottom: 0px;
}

.bottom-4 {
  bottom: 1rem;
}

.bottom-6 {
  bottom: 1.5rem;
}

.left-0 {
  left: 0px;
}

.left-1\/2 {
  left: 50%;
}

.right-0 {
  right: 0px;
}

.right-1 {
  right: 0.25rem;
}

.right-2 {
  right: 0.5rem;
}

.right-4 {
  right: 1rem;
}

.right-6 {
  right: 1.5rem;
}

.top-0 {
  top: 0px;
}

.top-1\/2 {
  top: 50%;
}

.top-2 {
  top: 0.5rem;
}

.top-\[110\%\] {
  top: 110%;
}

.top-\[5px\] {
  top: 5px;
}

.z-0 {
  z-index: 0;
}

.z-10 {
  z-index: 10;
}

.z-20 {
  z-index: 20;
}

.z-\[502\] {
  z-index: 502;
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.my-auto {
  margin-top: auto;
  margin-bottom: auto;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.ml-auto {
  margin-left: auto;
}

.mr-auto {
  margin-right: auto;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mt-\[2px\] {
  margin-top: 2px;
}

.block {
  display: block;
}

.inline-block {
  display: inline-block;
}

.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.table {
  display: table;
}

.grid {
  display: grid;
}

.contents {
  display: contents;
}

.hidden {
  display: none;
}

.h-10 {
  height: 2.5rem;
}

.h-12 {
  height: 3rem;
}

.h-14 {
  height: 3.5rem;
}

.h-16 {
  height: 4rem;
}

.h-32 {
  height: 8rem;
}

.h-4 {
  height: 1rem;
}

.h-5 {
  height: 1.25rem;
}

.h-6 {
  height: 1.5rem;
}

.h-7 {
  height: 1.75rem;
}

.h-8 {
  height: 2rem;
}

.h-\[10rem\] {
  height: 10rem;
}

.h-\[1122px\] {
  height: 1122px;
}

.h-\[12rem\] {
  height: 12rem;
}

.h-\[14rem\] {
  height: 14rem;
}

.h-\[8rem\] {
  height: 8rem;
}

.h-auto {
  height: auto;
}

.h-full {
  height: 100%;
}

.h-screen {
  height: 100vh;
}

.h-topnav-height {
  height: var(--topnav-height);
}

.max-h-\[15rem\] {
  max-height: 15rem;
}

.min-h-\[2\.5rem\] {
  min-height: 2.5rem;
}

.min-h-\[4rem\] {
  min-height: 4rem;
}

.min-h-full {
  min-height: 100%;
}

.min-h-topnav-height {
  min-height: var(--topnav-height);
}

.w-10 {
  width: 2.5rem;
}

.w-12 {
  width: 3rem;
}

.w-24 {
  width: 6rem;
}

.w-32 {
  width: 8rem;
}

.w-4 {
  width: 1rem;
}

.w-40 {
  width: 10rem;
}

.w-5 {
  width: 1.25rem;
}

.w-52 {
  width: 13rem;
}

.w-6 {
  width: 1.5rem;
}

.w-60 {
  width: 15rem;
}

.w-7 {
  width: 1.75rem;
}

.w-8 {
  width: 2rem;
}

.w-80 {
  width: 20rem;
}

.w-96 {
  width: 24rem;
}

.w-\[30rem\] {
  width: 30rem;
}

.w-\[40rem\] {
  width: 40rem;
}

.w-\[52\.5rem\] {
  width: 52.5rem;
}

.w-\[794px\] {
  width: 794px;
}

.w-\[8rem\] {
  width: 8rem;
}

.w-full {
  width: 100%;
}

.max-w-\[15rem\] {
  max-width: 15rem;
}

.max-w-\[990px\] {
  max-width: 990px;
}

.max-w-full {
  max-width: 100%;
}

.flex-1 {
  flex: 1 1 0%;
}

.flex-\[2\] {
  flex: 2;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.grow {
  flex-grow: 1;
}

.-translate-x-1\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.-translate-y-\[20\%\] {
  --tw-translate-y: -20%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

@keyframes pulse {
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.cursor-pointer {
  cursor: pointer;
}

.select-none {
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}

.grid-flow-row {
  grid-auto-flow: row;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.place-items-center {
  place-items: center;
}

.items-start {
  align-items: flex-start;
}

.items-end {
  align-items: flex-end;
}

.items-center {
  align-items: center;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-0 {
  gap: 0px;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

.gap-4 {
  gap: 1rem;
}

.self-start {
  align-self: flex-start;
}

.overflow-auto {
  overflow: auto;
}

.overflow-hidden {
  overflow: hidden;
}

.overflow-visible {
  overflow: visible;
}

.overflow-scroll {
  overflow: scroll;
}

.overflow-y-scroll {
  overflow-y: scroll;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.rounded {
  border-radius: 0.25rem;
}

.rounded-2xl {
  border-radius: 1rem;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.border {
  border-width: 1px;
}

.border-0 {
  border-width: 0px;
}

.border-y-2 {
  border-top-width: 2px;
  border-bottom-width: 2px;
}

.border-b {
  border-bottom-width: 1px;
}

.border-b-2 {
  border-bottom-width: 2px;
}

.border-l {
  border-left-width: 1px;
}

.border-l-4 {
  border-left-width: 4px;
}

.border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}

.border-error-border {
  --tw-border-opacity: 1;
  border-color: rgb(var(--error-border) / var(--tw-border-opacity));
}

.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}

.border-gray-300\/30 {
  border-color: rgb(209 213 219 / 0.3);
}

.border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
}

.border-orange-500 {
  --tw-border-opacity: 1;
  border-color: rgb(249 115 22 / var(--tw-border-opacity));
}

.border-primary {
  --tw-border-opacity: 1;
  border-color: rgb(var(--primary) / var(--tw-border-opacity));
}

.border-white\/10 {
  border-color: rgb(255 255 255 / 0.1);
}

.bg-bg-clr {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--bg-clr) / var(--tw-bg-opacity));
}

.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}

.bg-black\/50 {
  background-color: rgb(0 0 0 / 0.5);
}

.bg-black\/70 {
  background-color: rgb(0 0 0 / 0.7);
}

.bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}

.bg-error-bg {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--error-bg) / var(--tw-bg-opacity));
}

.bg-form-modal-clr {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--form-modal-clr) / var(--tw-bg-opacity));
}

.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}

.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}

.bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}

.bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}

.bg-gray-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(55 65 81 / var(--tw-bg-opacity));
}

.bg-green-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(74 222 128 / var(--tw-bg-opacity));
}

.bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity));
}

.bg-inherit {
  background-color: inherit;
}

.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--primary) / var(--tw-bg-opacity));
}

.bg-primary\/30 {
  background-color: rgb(var(--primary) / 0.3);
}

.bg-secondary {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--secondary) / var(--tw-bg-opacity));
}

.bg-sidebar-clr {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--sidebar-clr) / var(--tw-bg-opacity));
}

.bg-table-clr {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--table-clr) / var(--tw-bg-opacity));
}

.bg-transparent {
  background-color: transparent;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-yellow-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 240 138 / var(--tw-bg-opacity));
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-yellow-500 {
  --tw-gradient-from: #eab308 var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(234 179 8 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.object-cover {
  -o-object-fit: cover;
     object-fit: cover;
}

.p-0 {
  padding: 0px;
}

.p-1 {
  padding: 0.25rem;
}

.p-2 {
  padding: 0.5rem;
}

.p-3 {
  padding: 0.75rem;
}

.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.pb-12 {
  padding-bottom: 3rem;
}

.pl-2 {
  padding-left: 0.5rem;
}

.pl-6 {
  padding-left: 1.5rem;
}

.pl-\[1\.4rem\] {
  padding-left: 1.4rem;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-end {
  text-align: end;
}

.font-serif {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.text-5xl {
  font-size: 3rem;
  line-height: 1;
}

.text-7xl {
  font-size: 4.5rem;
  line-height: 1;
}

.text-\[10px\] {
  font-size: 10px;
}

.text-\[14px\] {
  font-size: 14px;
}

.text-\[15px\] {
  font-size: 15px;
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.font-bold {
  font-weight: 700;
}

.font-light {
  font-weight: 300;
}

.font-medium {
  font-weight: 500;
}

.font-normal {
  font-weight: 400;
}

.font-semibold {
  font-weight: 600;
}

.uppercase {
  text-transform: uppercase;
}

.capitalize {
  text-transform: capitalize;
}

.italic {
  font-style: italic;
}

.leading-none {
  line-height: 1;
}

.leading-tight {
  line-height: 1.25;
}

.text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}

.text-black\/70 {
  color: rgb(0 0 0 / 0.7);
}

.text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}

.text-primary {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}

.text-error-text {
  --tw-text-opacity: 1;
  color: rgb(var(--error-text) / var(--tw-text-opacity));
}

.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}

.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}

.text-orange-800 {
  --tw-text-opacity: 1;
  color: rgb(154 52 18 / var(--tw-text-opacity));
}

.text-primary {
  --tw-text-opacity: 1;
  color: rgb(var(--primary) / var(--tw-text-opacity));
}

.text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity));
}

.text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity));
}

.text-secondary {
  --tw-text-opacity: 1;
  color: rgb(var(--secondary) / var(--tw-text-opacity));
}

.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.underline {
  text-decoration-line: underline;
}

.opacity-50 {
  opacity: 0.5;
}

.opacity-70 {
  opacity: 0.7;
}

.shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.outline {
  outline-style: solid;
}

.ring-1 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.ring-inset {
  --tw-ring-inset: inset;
}

.ring-gray-300 {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity));
}

.blur {
  --tw-blur: blur(8px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.brightness-0 {
  --tw-brightness: brightness(0);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.grayscale {
  --tw-grayscale: grayscale(100%);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.invert {
  --tw-invert: invert(100%);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-150 {
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-500 {
  transition-duration: 500ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.ease-linear {
  transition-timing-function: linear;
}

.placeholder\:text-gray-400::-moz-placeholder {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity));
}

.placeholder\:text-gray-400::placeholder {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity));
}

.focus-within\:ring-2:focus-within {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus-within\:ring-inset:focus-within {
  --tw-ring-inset: inset;
}

.focus-within\:ring-primary:focus-within {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(var(--primary) / var(--tw-ring-opacity));
}

.hover\:bg-bg-clr:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(var(--bg-clr) / var(--tw-bg-opacity));
}

.hover\:text-text-clr:hover {
  --tw-text-opacity: 1;
  color: rgb(var(--text-clr) / var(--tw-text-opacity));
}

.hover\:underline:hover {
  text-decoration-line: underline;
}

.hover\:shadow-lg:hover {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.focus\:border:focus {
  border-width: 1px;
}

.focus\:border-primary:focus {
  --tw-border-opacity: 1;
  border-color: rgb(var(--primary) / var(--tw-border-opacity));
}

.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

@media (prefers-color-scheme: dark) {
  .dark\:bg-slate-900 {
    --tw-bg-opacity: 1;
    background-color: rgb(15 23 42 / var(--tw-bg-opacity));
  }

  .dark\:bg-slate-900\/70 {
    background-color: rgb(15 23 42 / 0.7);
  }

  .dark\:text-slate-400 {
    --tw-text-opacity: 1;
    color: rgb(148 163 184 / var(--tw-text-opacity));
  }
}

@media (min-width: 768px) {
  .md\:mb-0 {
    margin-bottom: 0px;
  }

  .md\:flex {
    display: flex;
  }
}

.t-body tr {
  color: var(--text-clr);
  @apply border-b border-gray-300/50;
}

/* tr:nth-child(even) {
  background-color: rgb(var(--primary) / .3);
  border-radius: 10px;
  overflow: hidden;
} */

.t-body tr td {
  /* @apply p-3 text-left text-sm ;  */
}

.data-table-scrollbar::-webkit-scrollbar {
  display: block;
  width: 5px;
}

.data-table-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1c9c9;
  border-radius: 50px;
}

.data-table-scrollbar {
  scrollbar-width: thin;
}

.t-head th, .t-body td {
  border: 1px solid black;
}

.t-head th:last-of-type {
  color: inherit;
}

.h-40 {
  height: 10rem;
}

.text-20pt {
  font-size: 20pt;
}

.text-12pt {
  font-size: 12pt;
}

.text-11pt {
  font-size: 11pt;
}

.dash {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%
  margin: 0 .5rem;
  border-bottom: 2px solid #000;
  width: 13rem;
  text-align: center;
  font-weight: 400' 
}

.dash.long-dash {
  width: 15rem;
}

.dash.dash-small {
  width: 8rem;
}

.box {
  width: 3rem;
  height: 1.3rem;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.h-14 {
  height: 14rem;
}

#qrcode {
  width:160px;
  height:160px;
  margin-top:15px;
}

.w-28 {
  width: 7rem
}

.h-28 {
  height: 7rem
}

.bottom-2 {
  bottom: 0.5rem
}

.bottom-12 {
  bottom: 3rem
}

@media print {
  #div1 {
    page-break-after: always;
  }
}
    </style>
    </head>
    `);
  printWindow.document.write(printableDiv.outerHTML);
  printWindow.document.write('</body></html>');

  printWindow.document.close();

  // Focus the new window and print
  printWindow.focus();
  printWindow.print();

  // Restore the original contents after printing
  document.body.innerHTML = originalContents;
  console.log('here')
}
</script>
<template>
  <button @click="print" class="px-4 py-1 font-semibold text-xl bg-green-400 text-white rounded-md mb-4">Print</button>
  <div v-if="agencyReq.pending.value" class="w-full p-2 flex justify-center">
    <FormLoading />
  </div>
  <div v-else id='printable' :style="{
    // backgroundImage: `url(/src/assets/crtificate_header.png)`
  }" class="overflow-y-scroll relative h-[1122px] flex items-center flex-col bg-white w-[52.5rem]">
    <img class="bottom-12 w-32 h-32 object-cover absolute z-20" src="/src/assets/Nyala_stamp.png" />
    <img class="absolute top-0 right-0 max-w-full" src="/src/assets/debit_advice.png" />
    <div class="absolute top-0 left-0 p-3">
      <img  src="/src/assets/nyala.png" class="w-32 h-3w-32 max-w-full" />
    </div>
    <div class="h-[10rem] h-14"></div>
    <div class="max-w-[990px] flex items-center flex-col">
      <p>የህይወት መድን ምስክር ወረቀት</p>
      <p class="text-20pt underline font-bold">Certificate of Life Assurance</p>
      <div class="flex w-full justify-center items-center">
        <p>በቡድን ህይወት ዋስትና ቁጥር</p>
        <div class="dash">
          {{ agencyReq.response.value?.agency?.agencyPolicyNumber }}
        </div>
        <p>መሠረት የተሰጠ</p>
      </div>
      <div class="mt-1 font-bold flex items-center flex-col">
        <p class="text-center text-12pt">Attaching to and forming part of Group Term Life Assurance</p>
        <div class="flex">
          Policy No
          <div class="dash h-full">
            {{ agencyReq.response.value?.agency?.agencyPolicyNumber }}
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="self-start leading-none mt-[2px]">
          1.
        </div>
        <div class="flex flex-col w-full leading-none">
          <div class="flex">
            <p>ሰርተፍኬት ቁጥር</p>
            <div class="flex-1 flex justify-center">
              የተሰጠበት ቀን
            </div>
          </div>
          <div class="flex">
            <div class="flex leading-none items-end">
              <p class="font-medium mt-1 text-[15px]">Certificate No.</p>
              <div class="dash long-dash">
                {{ insured?.certificateNumber }}
              </div>
            </div>
            <p>Date of Issue</p>
            <div class="dash">
              {{ secondDateFormat(insured?.paidDate) }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="self-start leading-none mt-[2px]">
          2.
        </div>
        <div class="flex flex-col w-full leading-none">
          <div class="flex">
            <p>የውሉ ባለቤት / የኤጀንሲው ስም</p>
          </div>
          <div class="flex">
            <div class="flex leading-none items-end">
              <p class="font-medium mt-1 text-[15px]">Policy Owner / Name of Agency</p>
              <div class="dash long-dash">
                {{ agencyReq.response.value?.agency?.agencyName }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="self-start leading-none mt-[2px]">
          3.
        </div>
        <div class="flex flex-col w-full leading-none">
          <div class="flex">
            <p>የመድን ገቢው ስም ከነአያት በፓስፖርት እንደተመለከተው</p>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex leading-none items-end">
              <p class="font-medium mt-1 text-[15px]">Name of Assured including grand father's name as indicated in the
                passport</p>
            </div>
            <div class="flex flex-col">
              <p>የአያት ስም </p>
              <div class="flex text-black font-medium">
                <p>Sur name</p>
                <div class="dash long-dash">
                  {{ insured?.grandFatherName }}
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <p>ስም ከነአባት</p>
              <div class="flex text-black font-medium">
                <p>Given name</p>
                <div class="dash long-dash">
                  {{ insured?.firstName }}
                  {{ insured?.fatherName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="self-start leading-none mt-[2px]">
          4.
        </div>
        <div class="flex flex-col gap-2 w-full leading-none">
          <div class="flex">
            <p class="flex-1">የመድን ገቢው አድራሻ ክልል</p>
            <p class="flex-1">ዞን /ክፍለ ከተማ</p>
            <p class="flex-1">ወረዳ</p>
            <p class="flex-1">ስልክ ቁጥር </p>
          </div>
          <div class="flex flex-col">
            <p class="font-medium text-base">Assured’s Address</p>
            <div class="flex flex-wrap">
              <div class="flex flex-1">
                <p class="font-medium mt-1 text-[15px] whitespace-nowrap">Rigion</p>
                <div class="dash dash-small">
                  {{ insured?.state }}
                </div>
              </div>
              <div class="flex flex-1">
                <p class="font-medium mt-1 text-[15px] whitespace-nowrap">Zone /Sub city</p>
                <div class="dash dash-small">
                  {{ insured?.address2 }}
                </div>
              </div>
              <div class="flex flex-1">
                <p class="font-medium mt-1 text-[15px] whitespace-nowrap">woreda</p>
                <div class="dash dash-small">
                  {{ insured?.address1 }}
                </div>
              </div>
              <div class="flex flex-1">
                <p class="font-medium mt-1 text-[15px] whitespace-nowrap">Tel. No</p>
                <div class="dash dash-small">
                  {{ insured?.phone }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="flex gap-2 w-full">
          <div class="">
            5.
          </div>
          <div class="flex-1 flex gap-4">
            <div class="flex flex-col">
              <p>ጾታ</p>
              <p class="font-medium">Sex</p>
            </div>
            <div class="flex flex-col">
              <div class="flex gap-2 items-center">
                <p class="w-24 text-end"><span>ወንድ</span> <span class="font-medium ml-2 w-12">Male</span></p>
                <div class="box">
                  <h-icon v-if="insured?.gender == 'Male'" name="bi-check2" />
                </div>
              </div>
              <div class="flex gap-2 items-center">
                <p class="w-24 text-end"><span>ሴት</span> <span class="font-medium ml-2 w-12">Female</span></p>
                <div class="box">
                  <h-icon v-if="insured?.gender == 'Female'" name="bi-check2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-2 w-full">
          <div class="">
            6.
          </div>
          <div class="flex-1 flex gap-4">
            <div class="flex flex-col">
              <p>የትውልድ ዘመን</p>
              <div class="flex">
                <p class="font-medium">Date of Birth</p>
                <div class="dash dash-small">
                  {{ secondDateFormat(insured?.birthDate) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-2 w-full">
          <div class="">
            7.
          </div>
          <div class="flex-1 flex gap-4">
            <div class="flex flex-col">
              <p>ዕድሜ</p>
              <div class="flex">
                <p class="font-medium">Age</p>
                <div class="dash dash-small">
                  {{ getAge(insured?.birthDate) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="self-start leading-none mt-[2px]">
          8.
        </div>
        <div class="flex flex-col w-full leading-none">
          <div class="flex">
            <p>የሚሄድበት ሀገር</p>
          </div>
          <div class="flex">
            <div class="flex leading-none items-end">
              <p class="font-medium mt-1 text-[15px]">Country of Destinationy</p>
              <div class="dash long-dash">
                {{ insured?.countryOfDestination }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="flex gap-2 w-full">
          <div class="">
            9.
          </div>
          <div class="flex-1 flex gap-4">
            <div class="flex flex-col">
              <p>የፓስፖርት ቁጥር</p>
              <div class="flex">
                <p class="font-medium">Passport Number</p>
                <div class="dash">
                  {{ insured?.passportNumber }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-2 w-full">
          <div class="">
            10.
          </div>
          <div class="flex-1 flex gap-4">
            <div class="flex flex-col">
              <p>ፓስፖርት የሚያበቃበት ቀን</p>
              <div class="flex">
                <p class="font-medium">Passport Expiry Date</p>
                <div class="dash">
                  {{ secondDateFormat(insured?.passportExpiryDate) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="flex gap-2 w-full">
          <div class="">
            11.
          </div>
          <div class="flex-1 flex gap-4">
            <div class="flex flex-col">
              <p>የውል ዘመን ከ</p>
              <div class="flex">
                <p class="font-medium">Period of cover  	From</p>
                <div class="dash">
                  {{ secondDateFormat(insured?.beginDate) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-2 w-full">
          <div class="flex-1 flex gap-4">
            <div class="flex flex-col">
              <p>እስከ</p>
              <div class="flex mt-auto">
                <p class="font-medium">to</p>
                <div class="dash">
                  {{ secondDateFormat(insured?.endDate) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="self-start leading-none mt-[2px]">
          12.
        </div>
        <div class="flex flex-col w-full leading-none">
          <div class="flex">
            <p>የአረቦን መጠን ብር 5 የቀረጥ ቴምብር ጨምሮ </p>
          </div>
          <div class="flex">
            <div class="flex leading-none items-end">
              <p class="font-medium mt-1 text-[15px]">Premium Including Revenue Stamp Birr</p>
              <div class="dash long-dash">{{ formatCurrency(payment) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="self-start leading-none mt-[2px]">
          13.
        </div>
        <div class="flex flex-col w-full leading-none">
          <div class="flex">
            <p>ውሉ የሚሰጠው ሽፋን ፖሊሲው ላይ በተዘረዘረው መሠረት ይሆናል</p>
          </div>
          <div class="flex">
            <div class="flex leading-none items-end">
              <p class="font-medium mt-1 text-[15px]">Cover as per the policy details</p>
              <div class="dash long-dash"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 text-11pt text-black flex gap-2 w-full">
        <div class="self-start leading-none mt-[2px]">
          14.
        </div>
        <div class="flex flex-col w-full leading-none">
          <div class="flex">
            <p>የመድን ውሉ ተጠቃሚዎች በመድን ገቢው ተሞልቶ በተፈረመው ቅጽ መሠረት ይሆናል</p>
          </div>
          <div class="flex">
            <div class="flex leading-none items-end">
              <p class="font-medium mt-1 text-[15px]">Beneficiaries as stated in the beneficiary’s form</p>
              <div class="dash long-dash"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center w-full">
        <div class="">
          <div class="dash long-dash">
            <img class="w-14 h-12 mb-1 object-cover" src="/src/assets/sign.png" />
          </div>
          <p class="pl-2">
            የኃላፊው ስምና ፊርማ
          </p>
          <p class="pl-2 font-medium">
            Name and Signature of Authorized Person
          </p>
        </div>
        <div class="h-14 flex items-center justify-center left-1/2 -translate-x-1/2">
          <QrCode v-if="value" :value="value" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.text-20pt {
  font-size: 20pt;
}

.text-12pt {
  font-size: 12pt;
}

.text-11pt {
  font-size: 11pt;
}

.dash {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  @apply h-full mx-2 border-b border-black w-52 text-center font-normal
}

.dash.long-dash {
  @apply w-60
}

.dash.dash-small {
  @apply w-24
}

.box {
  width: 3rem;
  height: 1.3rem;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
body {

}
</style>