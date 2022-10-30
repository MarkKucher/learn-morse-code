import React, {useEffect, useRef, useState} from 'react';
import styles from "../styles/Home.module.scss";
import MainLayout from "../components/MainLayout";
import {enMorse} from "../utils/morse-code-en";
import {specialSymbolsMorse} from "../utils/morse-code-special-symbols";
import {specialCharactersMorse} from "../utils/morse-code-special-characters";
import {noMorse} from "../utils/morse-code-no";
import {useCheckAffiliation} from "../hooks/useCheckAffiliation";
import {recursiveCheck} from "../adjuvant/recursiveCheck";
import {getValueByKey} from "../adjuvant/getValueByKey";

const Index: React.FC = () => {
    const [isWriting, setIsWriting] = useState<boolean>(false);
    const [isForbiddenKeyPressed, setIsForbiddenKeyPressed] = useState<boolean>(false);
    const [sentence, setSentence] = useState<string[]>(['|'])
    const [prevSentence, setPrevSentence] = useState<string[]>(['|'])
    const [translation, setTranslation] = useState<string[]>([])
    const [highlightedCouple, setHighlightedCouple] = useState<number[]>([])
    const ref = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<any>(null);
    const forbiddenRef = useRef<any>(null);

    useEffect(() => {
        let index = sentence.indexOf('|')
        if(highlightedCouple.length !== 0) {
            const differance = sentence.length - prevSentence.length;
            if(differance > 0) {
                setHighlightedCouple(highlightedCouple.map((i) => {
                    if(i > index) {
                        return i + differance;
                    } else {
                        return i;
                    }
                }))
            } else if(differance < 0) {
                let prevIndex = prevSentence.indexOf('|');
                let moveX = index - prevIndex;
                let outputArray = highlightedCouple;
                if(moveX === -1) {
                    outputArray.map((i) => {
                        if(i === index) {
                            outputArray = outputArray.filter(num => num !== i)
                        }
                    })
                } else if(moveX === 0) {
                    outputArray.map((i) => {
                        if(i === index) {
                            outputArray = outputArray.filter(num => num !== i)
                        }
                    })
                }
                setHighlightedCouple(outputArray.map((i) => {
                    if(i > index) {
                        return i - 1;
                    } else {
                        return i;
                    }
                }))
            }
        }
        setPrevSentence(sentence)
    }, [sentence])


    
    useEffect(() => {
        if(!isWriting) {
            let index = sentence.indexOf('|')
            let translationArray = [];
            let arrayOfLetters = [...sentence.slice(0, index), ...sentence.slice(index + 1)]
            arrayOfLetters.map((s) => {
                translationArray.push(getValueByKey(s.toLowerCase(), [noMorse, enMorse, specialSymbolsMorse, specialCharactersMorse, {' ': ' '}]))
            })
            setTranslation(translationArray)
        }
    }, [isWriting])

    const emitWriting = () => {
        setIsWriting(true)
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setIsWriting(false)
        }, 500)
    }

    const forbidden = () => {
        setIsWriting(false)
        setIsForbiddenKeyPressed(true)
        if(forbiddenRef.current) {
            clearTimeout(forbiddenRef.current)
        }
        forbiddenRef.current = setTimeout(() => {setIsForbiddenKeyPressed(false)}, 300)
    }

    const changeSentence = (str: string) => {
        let index = sentence.indexOf('|')
        if(str.length > 1) {
            let isAllowed = true;
            str.split('').map((s) => {
                if(!useCheckAffiliation(s.toLowerCase(), [enMorse, noMorse, specialCharactersMorse, specialSymbolsMorse, {' ': ' '}])) {
                    isAllowed = false;
                }
            })
            if(!isAllowed) {
                forbidden()
                return;
            }
            setSentence([...sentence.slice(0, index), ...str.split(''), ...sentence.slice(index)])
        } else {
            if (!useCheckAffiliation(str.toLowerCase(), [enMorse, noMorse, specialCharactersMorse, specialSymbolsMorse, {' ': ' '}])) {
                forbidden()
                return;
            }
            setSentence([...sentence.slice(0, index), str, ...sentence.slice(index)])
        }
        setPrevSentence(sentence)
    }

    const onChange = (e) => {
        if(e.target.value.length > 1) {
            changeSentence(e.target.value)
        }
    }

    const onKeyDown = (e) => {
        let index = sentence.indexOf('|')
        let newArray = []
        switch (e.key) {
            case 'ArrowRight':
                if(index === sentence.length - 1) {
                    forbidden()
                    break
                }
                setSentence([...sentence.slice(0, index), sentence[index + 1], '|', ...sentence.slice(index + 2)])
                break
            case 'ArrowLeft':
                if(index === 0) {
                    forbidden()
                    return;
                }
                setPrevSentence(sentence)
                setSentence([...sentence.slice(0, index - 1), '|', sentence[index - 1], ...sentence.slice(index + 1)])
                break
            case 'Backspace':
                if(index === 0) {
                    forbidden()
                    return;
                }
                emitWriting()
                newArray = [...sentence.slice(0, index - 1), '|', ...sentence.slice(index + 1)]
                setPrevSentence(sentence)
                setSentence(newArray)
                break
            case 'Delete':
                if(index === sentence.length - 1) {
                    forbidden()
                    return;
                }
                emitWriting()
                newArray = [...sentence.slice(0, index + 1), ...sentence.slice(index + 2)]
                setSentence(newArray)
                break
            case 'Enter':
                break
        }
    }

    const onKeyPress = (e) => {
        if(e.key !== 'Enter') {
            emitWriting()
            changeSentence(e.key)
        }
    }



    useEffect(() => {
        ref.current?.focus()
    }, [])

    const highlight = (index) => {
        return () => {
            let isAlreadyHighlighted = useCheckAffiliation(index, [highlightedCouple], 'byValue')
            if(isAlreadyHighlighted) {
                setHighlightedCouple(highlightedCouple.filter(i => i !== index))
            } else {
                setHighlightedCouple([...highlightedCouple, index])
            }
        }
    }


    return (
        <MainLayout>
            <input value={''} onChange={onChange} onKeyDown={onKeyDown} onBlur={() => {ref.current?.focus()}} ref={ref} type="text" className={styles.fakeInput} onKeyPress={onKeyPress}/>
            <div className={styles.main}>
                <div className={styles.container}>
                    {sentence.map((letter, index) => {
                        return letter == ' ' ? <span className={styles.spaces} key={index}>&#160;</span>
                            : letter == '|' ? <span key={index} className={isForbiddenKeyPressed ? styles.forbidden : isWriting ? styles.active : styles.passive}>
                                    {letter}
                                </span>
                            : <span
                            key={index}
                            onClick={highlight(index > sentence.indexOf('|') ? index - 1 : index)}
                            className={highlightedCouple && useCheckAffiliation(index > sentence.indexOf('|') ? index - 1 : index, [highlightedCouple], 'byValue') ? styles.highlighted : styles.default}>
                                {letter}
                            </span>
                    })}
                </div>
                {
                    sentence.length != 1 &&
                    <div className={styles.containerWithBits}>
                        {translation.map((bit, index) => {
                            if (bit == ' ') return <span className={styles.spaces} key={index}>&#160;&#160;&#160;&#160;</span>
                            return <span
                                className={highlightedCouple && useCheckAffiliation(index, [highlightedCouple], 'byValue') ? styles.highlighted : styles.default}
                                onClick={highlight(index)}
                                key={index}>
                                {bit.split('').join(' ')}&#160;&#160;
                            </span>;
                        })}
                    </div>
                }
            </div>
        </MainLayout>
    );
};

export default Index;