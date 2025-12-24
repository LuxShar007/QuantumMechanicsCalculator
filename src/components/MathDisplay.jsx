import React, { useEffect, useRef } from 'react';
import katex from 'katex';

export function InlineMath({ math }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            katex.render(math, ref.current, {
                throwOnError: false,
                displayMode: false
            });
        }
    }, [math]);
    return <span ref={ref} />;
}

export function BlockMath({ math }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            katex.render(math, ref.current, {
                throwOnError: false,
                displayMode: true
            });
        }
    }, [math]);
    return <div ref={ref} />;
}
