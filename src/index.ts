export type Submodule = Record<string, Record<string, string>>;

export function deserialize(str: string): Submodule {
	const ss: string[] = str.split('\n');
	const ret: Submodule = {};
	for ( let idx=0; idx < ss.length; idx++ ) {
		const line: string = ss[idx];
		const result = line.match(/\[submodule\s+\"(.*?)\"\]/) as any;
		if ( !result || result.length < 2 ) {
			continue;
		}
		const submodule = result[1];
		const obj: Record<string, string> = {};
		if ( submodule ) {
			let subline = ss[++idx];
			while ( subline && subline.trim() ) {
				subline = ss[idx];
				if ( !subline || subline.match(/\[submodule\s+\"(.*?)\"\]/) ) {
					idx--;
					break;
				}
				subline = subline.trim();
				const [ subginal, key, value ] = subline.match(/(.*?)\s*=\s*(.*)/) as any;
				if ( key && value ) {
					obj[key] = value;
				}
				idx++;
			}
			ret[submodule] = obj;
		}
	}
	return ret;
}

export function serialize(obj: Submodule): string {
	if ( !obj ) {
		return '';
	}

	let str: string = '';

	const entries = Object.entries(obj);
	for ( const [ key, value ] of entries ) {
		str += `[submodule "${key}"]\n`;
		const values = Object.entries(value);
		for ( const [ left, right ] of values ) {
			str += `	${left} = ${right}\n`;
		}
		str += '\n';
	}

	return str;
}
