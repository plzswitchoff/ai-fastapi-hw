from transformers import pipeline

translator = pipeline("translation", model = "facebook/mbart-large-50-many-to-many-mmt")

sentimental = pipeline(
    "sentiment-analysis", model= "nlptown/bert-base-multilingual-uncased-sentiment"
)

def translate_and_score(text:str)->dict:
    tr=translator(text, src_lang="en_XX", tgt_lang="ko_KR")[0]["translation_text"]
    se=sentimental(tr)[0]
    return {
        "source":text,
        "translated":tr,
        "sentiment":se
    }