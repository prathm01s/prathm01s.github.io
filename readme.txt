const pronouns = [
    'all', 'another', 'any', 'anybody', 'anyone', 'anything', 'as', 'aught', 'both', 'each', 
    'each other', 'either', 'everybody', 'everyone', 'everything', 'few', 'he', 'her', 'hers', 
    'herself', 'him', 'himself', 'his', 'i', 'it', 'its', 'itself', 'many', 'me', 'mine', 
    'most', 'my', 'myself', 'naught', 'neither', 'no one', 'nobody', 'none', 'nothing', 
    'one', 'one another', 'other', 'others', 'ought', 'our', 'ours', 'ourselves', 'several', 
    'she', 'some', 'somebody', 'someone', 'something', 'such', 'that', 'their', 'theirs', 
    'them', 'themselves', 'these', 'they', 'this', 'those', 'thou', 'thee', 'thy', 'thine', 
    'us', 'we', 'what', 'whatever', 'which', 'whichever', 'who', 'whoever', 'whom', 
    'whomever', 'whose', 'ye', 'you', 'your', 'yours', 'yourself', 'yourselves'
];

const prepositions = [
    'aboard', 'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 
    'around', 'as', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 
    'beyond', 'but', 'by', 'concerning', 'considering', 'despite', 'down', 'during', 
    'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'minus', 'near', 'of', 
    'off', 'on', 'onto', 'opposite', 'outside', 'over', 'past', 'per', 'plus', 'regarding', 
    'round', 'since', 'than', 'through', 'to', 'toward', 'towards', 'under', 'underneath', 
    'unlike', 'until', 'up', 'upon', 'versus', 'via', 'with', 'within', 'without', 
    'according to', 'ahead of', 'apart from', 'as for', 'as of', 'as per', 'as regards', 
    'aside from', 'back to', 'because of', 'close to', 'due to', 'except for', 'far from', 
    'in addition to', 'in front of', 'in lieu of', 'in place of', 'in spite of', 'instead of', 
    'near to', 'next to', 'on behalf of', 'on top of', 'out of', 'outside of', 'owing to', 
    'prior to', 'pursuant to', 'regardless of', 'subsequent to', 'thanks to', 'up to', 
    'with regard to', 'a la', 'as far as', 'as well as', 'by means of', 'in accordance with', 
    'in case of', 'in favour of', 'in favor of', 'in light of', 'in terms of', 'on account of', 
    'vis-a-vis', 'with respect to', 'along with', 'away from', 'but for', 'contrary to', 
    'depending on', 'further to', 'irrespective of', 'other than', ' preparatory to', 
    'together with', 'up against', 'with reference to'
];

Special symbols are counted as any character matching the following regex: /[^a-zA-Z0-9\s]/g
