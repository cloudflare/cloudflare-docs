import { useMemo } from 'react';
import { useFramework } from '../hooks/useFramework';
import uikit from '../../../util/realtimekit/ui-kit.ts';
import core from '../../../util/realtimekit/web-core.ts';

const ReleaseNotes = ({ type }: { type: 'ui-kit' | 'core' }) => {
    const { platform, framework } = useFramework();

    const notes = useMemo(() => {
        if (platform === 'web') {
            if (type === 'ui-kit') return uikit;
            return core;
        }
        return [];
    }, [framework, platform, type])

    if (notes?.length < 1) {
        return <div>No releas notes found!</div>
    }

    return (
        <div className='flex flex-col items-start justify-start'>
            {notes.map((note) => (
                <div key={note.version} className='flex flex-col items-start justify-start'>Item</div>
            ))}
        </div>
    )
}

export default ReleaseNotes