const formElements = [
  'input',
  'textarea',
  'select',
  'button',
  'label',
  'fieldset',
  'legend',
  'datalist',
  'optgroup',
  'option',
  'output',
  'progress',
] as const;
export type FormElements = (typeof formElements)[number];