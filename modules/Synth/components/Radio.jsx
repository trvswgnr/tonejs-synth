export function Radio({name, label, ...props}) {
	const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return <div><input name={name} type="radio" id={id} {...props} /> <label htmlFor={id}>{label}</label></div>;
}
